import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
  Output,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { emit } from 'node:process';
import { ImgHandler } from '../interfaces/img-handler';

@Directive({
  selector: '[appDragDropImg]',
})
export class DragDropImg {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer2 = inject(Renderer2);
  postImgFile = output<ImgHandler>();

  @HostListener('dragenter', ['$event'])
  onDragIn(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.renderer2.addClass(this.elementRef.nativeElement, 'dragIn');
    this.renderer2.removeClass(this.elementRef.nativeElement, 'dragOut');
  }
  @HostListener('dragleave', ['$event'])
  onDragOut(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.renderer2.removeClass(this.elementRef.nativeElement, 'dragIn');
    this.renderer2.addClass(this.elementRef.nativeElement, 'dragOut');
  }
  @HostListener('dragover', ['$event'])
  onDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.renderer2.addClass(this.elementRef.nativeElement, 'dragIn');
    this.renderer2.removeClass(this.elementRef.nativeElement, 'dragOut');
  }
  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const imgFile = e.dataTransfer?.files[0];
    if (imgFile) {
      // this.postImgFile.emit(imgFile)
      let reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = (e) => {
        // this.postImgFileUrl.emit(reader.result)
        let imgFileHandler: ImgHandler = {
          file: imgFile,
          url: reader.result,
        };
        this.postImgFile.emit(imgFileHandler);
      };
    }
  }
}

/*
حاجات ساعدتني اعمل الابلود

عموما خش اقرا الشات دا
https://chatgpt.com/share/69061e58-f9d8-8012-aaf2-6d611489b541
و الفايل ريدر عشان يظهر الصوره
استخدمنا الformControl().reset() عشان نعمل ابديت للانبوت لما نيجي نلغي او نمسح الصوره

للدروب
https://www.youtube.com/watch?v=VQaYDSPSTtU&t=2052s
اعمل الدروب اوفر ايفينت

بلص بقا فيديوهات المنيسي و معطي فالجزئيه دي

*/
