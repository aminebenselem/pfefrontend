// Define interfaces for our data models
interface User {
email: any;
  id: string;
  name: string;
  department: string;
  noteCount: number;
}

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdDate: Date;
  userId: string;
}

import { CommonModule } from '@angular/common';
// hr-users.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  selector: 'app-hr-users',
  templateUrl: './hr-users.component.html',
  styleUrls: ['./hr-users.component.scss']
})
export class HrUsersComponent implements OnInit {
  // User data
  users: User[] = [
    {
      id: '1', name: 'John Doe', department: 'Engineering', noteCount: 3,
      email: "john@doe"
    },
    {
      id: '2', name: 'Jane Smith', department: 'Marketing', noteCount: 2,
      email: "john@doe"
    },
    {
      id: '3', name: 'Robert Johnson', department: 'Finance', noteCount: 1,
      email: "john@doe"
    },
    {
      id: '4', name: 'Emily Davis', department: 'Human Resources', noteCount: 0,
      email: "john@doe"
    }
  ];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  searchControl = new FormControl('');
  
  // Notes data
  notesMap = new Map<string, Note[]>();
  currentNotes: Note[] = [];
  loadingNotes = false;
  
  // Modal data
  noteForm: FormGroup;
  isModalVisible = false;
  isEditMode = false;
  currentNoteId: string | null = null;
note: any;
  
  constructor(private fb: FormBuilder) {
    // Initialize note form
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['']
    });
    
    // Initialize with sample data for user 1
    this.notesMap.set('1', [
      {
        id: '1',
        title: 'Meeting Notes',
        content: 'Discussed project timeline and next steps.',
        tags: ['Meeting', 'Project'],
        createdDate: new Date(),
        userId: '1'
      },
      {
        id: '2',
        title: 'Performance Review',
        content: 'Annual performance review preparation notes.',
        tags: ['HR', 'Review'],
        createdDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
        userId: '1'
      },
      {
        id: '3',
        title: 'Training Plan',
        content: 'New employee training schedule and materials.',
        tags: ['Training', 'Onboarding'],
        createdDate: new Date(Date.now() - 86400000 * 5), // 5 days ago
        userId: '1'
      }
    ]);
    
    // Add sample notes for other users
    this.notesMap.set('2', [
      {
        id: '4',
        title: 'Campaign Strategy',
        content: 'Q2 marketing campaign strategy and goals.',
        tags: ['Marketing', 'Strategy'],
        createdDate: new Date(),
        userId: '2'
      },
      {
        id: '5',
        title: 'Social Media Plan',
        content: 'Content calendar for next month.',
        tags: ['Social', 'Content'],
        createdDate: new Date(Date.now() - 86400000 * 3),
        userId: '2'
      }
    ]);
    
    this.notesMap.set('3', [
      {
        id: '6',
        title: 'Budget Review',
        content: 'Q1 budget review and Q2 projections.',
        tags: ['Finance', 'Budget'],
        createdDate: new Date(),
        userId: '3'
      }
    ]);
  }
  
  ngOnInit(): void {
    // Initialize users
    this.filteredUsers = [...this.users];
    
    // Select first user by default
    if (this.users.length > 0) {
      this.selectUser(this.users[0].id);
    }
    
    // Set up search functionality
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      if (term !== null) {
        this.searchUsers(term);
      }
    });
  }
  
  // User functions
  searchUsers(term: string): void {
    if (!term.trim()) {
      this.filteredUsers = [...this.users];
      return;
    }
    
    term = term.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(term) || 
      user.department.toLowerCase().includes(term)
    );
  }
  
  selectUser(userId: string): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.selectedUser = user;
      this.loadUserNotes(userId);
    }
  }
  
  getInitials(name: string): string {
    return name.split(' ')
      .map(n => n[0])
      .join('');
  }
  
  // Notes functions
  loadUserNotes(userId: string): void {
    this.loadingNotes = true;
    
    // Simulate API delay
    setTimeout(() => {
      this.currentNotes = this.notesMap.get(userId) || [];
      this.loadingNotes = false;
    }, 500);
  }
  
  addNote(): void {
    if (this.noteForm.valid && this.selectedUser) {
      const formValue = this.noteForm.value;
      const tags = formValue.tags
        ? formValue.tags.split(',').map((tag: string) => tag.trim())
        : [];
      
      const userId = this.selectedUser.id;
      const userNotes = this.notesMap.get(userId) || [];
      
      if (this.isEditMode && this.currentNoteId) {
        // Update existing note
        const noteIndex = userNotes.findIndex(note => note.id === this.currentNoteId);
        if (noteIndex !== -1) {
          userNotes[noteIndex] = {
            ...userNotes[noteIndex],
            title: formValue.title,
            content: formValue.content,
            tags: tags
          };
        }
      } else {
        // Create new note
        const newNote: Note = {
          id: Date.now().toString(), // Simple ID generation
          title: formValue.title,
          content: formValue.content,
          tags: tags,
          createdDate: new Date(),
          userId: userId
        };
        
        userNotes.unshift(newNote);
        
        // Update note count
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          this.users[userIndex].noteCount = userNotes.length;
          if (this.selectedUser.id === userId) {
            this.selectedUser = {...this.users[userIndex]};
          }
        }
      }
      
      // Update notes map and current notes
      this.notesMap.set(userId, userNotes);
      this.currentNotes = [...userNotes];
      
      // Close modal
      this.closeNoteModal();
    }
  }
  
  deleteNote(noteId: string): void {
    if (confirm('Are you sure you want to delete this note?') && this.selectedUser) {
      const userId = this.selectedUser.id;
      const userNotes = this.notesMap.get(userId) || [];
      
      // Filter out the deleted note
      const filteredNotes = userNotes.filter(note => note.id !== noteId);
      
      // Update notes map and current notes
      this.notesMap.set(userId, filteredNotes);
      this.currentNotes = [...filteredNotes];
      
      // Update note count
      const userIndex = this.users.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex].noteCount = filteredNotes.length;
        if (this.selectedUser.id === userId) {
          this.selectedUser = {...this.users[userIndex]};
        }
      }
    }
  }
  
  // Modal functions
  openAddNoteModal(): void {
    this.isModalVisible = true;
    this.isEditMode = false;
    this.currentNoteId = null;
    this.noteForm.reset();
  }
  
  openEditNoteModal(note: Note): void {
    this.isModalVisible = true;
    this.isEditMode = true;
    this.currentNoteId = note.id;
    
    this.noteForm.setValue({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', ')
    });
  }
  
  closeNoteModal(): void {
    this.isModalVisible = false;
    this.noteForm.reset();
  }
  
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
}