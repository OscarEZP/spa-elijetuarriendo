import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {
  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
  ) { }

  // confirm(title: string, message: string, options: string[]): Observable<string> {
  //   const initialState = { title, message, options, answer: '' };
  //   this.bsModalRef = this.bsModalService.show(ConfirmModalComponent, { initialState, ignoreBackdropClick: true });

  //   return new Observable<string>(this.getConfirmSubscriber());
  // }

  // info(title: string, message: string, options: string[], type: string): Observable<string> {
  //   const initialState = { title, message, options, type, answer: '' };
  //   this.bsModalRef = this.bsModalService.show(InfoModalComponent, { initialState });

  //   return new Observable<string>(this.getConfirmSubscriber());
  // }

  // error(title: string, message: string, options: string[], textError: string, errors: any[]): Observable<string> {
  //   const initialState = { title, message, options, textError, answer: '', errors };
  //   this.bsModalRef = this.bsModalService.show(ErrorModalComponent, { initialState });

  //   return new Observable<string>(this.getConfirmSubscriber());
  // }


  private getConfirmSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((reason: string) => {
        observer.next(this.bsModalRef.content.answer);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    };
  }
}
