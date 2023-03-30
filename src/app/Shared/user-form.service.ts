import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserFormValues {
  name: string;
  email: string;
  dob: string;
  gender: string;
  phone: string;
  street: string;
  state: string;
  city: string;
  pin: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  private Submissions: BehaviorSubject<UserFormValues[]>;

  constructor() {
    this.Submissions = new BehaviorSubject<UserFormValues[]>(
      this.getLocalData()
    );
  }

  addSubmission(newSubmission: UserFormValues): void {
    this.Submissions.next([...this.Submissions.value, newSubmission]);
    this.setLocalData();
  }

  getSubmissions(): Observable<UserFormValues[]> {
    return this.Submissions.asObservable();
  }

  private setLocalData() {
    localStorage.setItem(
      'formSubmissions',
      JSON.stringify(this.Submissions.value)
    );
  }
  private getLocalData(): UserFormValues[] {
    const submissions = localStorage.getItem('formSubmissions');
    if (submissions) {
      return JSON.parse(submissions);
    }
    return [];
  }
}
