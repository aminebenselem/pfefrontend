import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
declare var paper: any; // Declare Paper.js

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private shapeGroup: any;
  private positionArray: { x: number; y: number }[] = [];

  ngAfterViewInit(): void {
    paper.install(window);
    paper.setup(this.canvasRef.nativeElement);
    this.initializeShapes();

    paper.view.onFrame = (event: any) => this.animateShapes(event);
    paper.view.onResize = () => this.resizeCanvas();
  }

  private getCanvasBounds(): void {
    const canvasWidth = paper.view.size.width;
    const canvasHeight = paper.view.size.height;
    const canvasMiddleX = canvasWidth / 2;
    const canvasMiddleY = canvasHeight / 2;

    this.positionArray = [
      { x: canvasMiddleX + 50, y: 100 },
      { x: 200, y: canvasMiddleY },
      { x: canvasMiddleX + 100, y: 150 },
      { x: 0, y: canvasMiddleY + 100 },
      { x: canvasWidth - 130, y: canvasHeight - 75 },
      { x: canvasMiddleX + 80, y: canvasHeight - 50 },
      { x: canvasWidth + 60, y: canvasMiddleY - 50 },
      { x: canvasMiddleX + 100, y: canvasMiddleY + 100 }
    ];
  }

  private initializeShapes(): void {
    this.getCanvasBounds();
    this.shapeGroup = new paper.Group();

    const shapePathData = [
      'M231,352l445-156L600,0L452,54L331,3L0,48L231,352',
      'M0,0l64,219L29,343l535,30L478,37l-133,4L0,0z',
      'M0,65l16,138l96,107l270-2L470,0L337,4L0,65z'
    ];

    shapePathData.forEach((pathData, i) => {
      const shape = new paper.Path({
        strokeColor: 'rgba(255, 255, 255, 0.5)',
        strokeWidth: 2,
        parent: this.shapeGroup
      });
      shape.pathData = pathData;
      shape.scale(2);
      shape.position = this.positionArray[i];
    });
  }

  private animateShapes(event: any): void {
    if (event.count % 4 === 0) {
      this.shapeGroup.children.forEach((child: any, i: number) => {
        child.rotate(i % 2 === 0 ? -0.1 : 0.1);
      });
    }
  }

  private resizeCanvas(): void {
    this.getCanvasBounds();
    this.shapeGroup.children.forEach((child: any, i: number) => {
      child.position = this.positionArray[i];
    });
  }
}
