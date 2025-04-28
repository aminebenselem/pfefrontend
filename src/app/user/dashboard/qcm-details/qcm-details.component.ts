import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qcm-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qcm-details.component.html',
  styleUrl: './qcm-details.component.css'
})
export class QcmDetailsComponent implements OnInit, OnDestroy {
  userAnswers: { [questionId: number]: number[] } = {};
  quizResult: any = null;

  qcmId: any;
  qcm: any;
  timer: any;
  displayTime: string = '';
  duration: number = 0;
  token: any = localStorage.getItem('token');
  header = new HttpHeaders().set("authorization", "Bearer " + this.token);
  timeLeft: number = 0;
  routerSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.qcmId = this.route.snapshot.paramMap.get('id');
    if (this.qcmId) {
      this.getById();
    }
    window.addEventListener('beforeunload', this.preventRefresh);

    // 🔥 Listen to Angular navigation
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.submitExam(); // submit before navigating away
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    window.removeEventListener('beforeunload', this.preventRefresh);
    localStorage.removeItem('examStart');
    if (this.routerSub) {
      this.routerSub.unsubscribe(); // Clean up router event listener
    }
  }

  getById() {
    this.http.get('http://localhost:8080/qcm/' + this.qcmId).subscribe({
      next: (res: any) => {
        this.qcm = res;
        if (this.qcm && this.qcm.duration) {
          this.setupTimer(this.qcm.duration);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  setupTimer(durationMinutes: number) {
    const savedStart = localStorage.getItem('examStart');
    const now = new Date().getTime();

    if (savedStart) {
      const elapsed = Math.floor((now - +savedStart) / 1000);
      this.timeLeft = Math.max(0, (durationMinutes * 60) - elapsed);
    } else {
      localStorage.setItem('examStart', now.toString());
      this.timeLeft = durationMinutes * 60;
    }

    this.updateDisplayTime();
    this.startTimer();
  }

  updateDisplayTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.displayTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateDisplayTime();
      } else {
        clearInterval(this.timer);
        this.submitExam(); 
      }
    }, 1000);
  }

  submitExam() {
    if (this.quizResult) {
      return; // already submitted
    }

    const payload = Object.entries(this.userAnswers).map(([questionId, selectedOptionIds]) => ({
      questionId: Number(questionId),
      selectedOptionIds: selectedOptionIds
    }));

    this.http.post('http://localhost:8080/quiz/submit/' + this.qcmId, payload, { headers: this.header }).subscribe({
      next: (res) => {
        console.log('Exam submitted!', res);
        this.quizResult = res;
      },
      error: (err) => {
        console.error('Error submitting exam:', err);
      }
    });
  }

  preventRefresh = (event: BeforeUnloadEvent) => {
    this.submitExam();
    event.preventDefault();
    event.returnValue = '';
  };

  onOptionChange(questionId: number, optionId: number, event: any): void {
    const checked = event.target.checked;
    if (!this.userAnswers[questionId]) {
      this.userAnswers[questionId] = [];
    }

    if (checked) {
      this.userAnswers[questionId].push(optionId);
    } else {
      this.userAnswers[questionId] = this.userAnswers[questionId].filter(id => id !== optionId);
    }
  }
}
