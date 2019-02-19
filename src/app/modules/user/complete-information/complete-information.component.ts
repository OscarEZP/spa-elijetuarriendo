import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-complete-information',
  templateUrl: './complete-information.component.html',
  styleUrls: ['./complete-information.component.scss']
})
export class CompleteInformationComponent implements OnInit {
  ngForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.ngForm = this.fb.group({
      firstName: [null, Validators.required],
      secondName: [null, Validators.required],
      lastname: [null, Validators.required],
      rut: [null, Validators.required],
      address: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
    });
  }

  getForm(form: any) {
    console.log(form);
  }

}
