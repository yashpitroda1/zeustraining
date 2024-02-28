import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { expand } from 'rxjs';
import { JobRole, Technology } from './registration.model';
import { RegistrationService } from './registration.service';



@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {

  // @ViewChild(MatAccordion) accordion!: MatAccordion;
  accordion: boolean = true;
  iseducationalExpand: boolean = false;
  isprofessionalExpand: boolean = false;

  onlastpage: boolean = false;
  previousbtn: boolean = false;
  value: string = ''; // Default to None
  pinfo!: any;
  qinfo!: any;
  selectedYear: number;
  minimumyear: number = 1970;
  years: number[] = [];
  months: number[] = [];
  selecteddegree!: String;
  degrees: String[] = ['Bachelor of Engineering', 'Bachelor of Arts'];

  selectedstream!: String;
  streams: String[] = ['Information Technology', 'Design'];

  selectedcollege!: String;
  colleges: String[] = ['LDCE', 'NIRMA', 'PDEU'];

  Technologies: String[] = ['Javascript', 'Angular JS', 'React', 'Node JS', 'Other'];

  jobrolesarray!: JobRole[];
  technologiesarray!: Technology[];

  datestr: any;

  formsubmitted: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private registrationservice: RegistrationService) {
    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= this.minimumyear; year--) {
      this.years.push(year);
    }
    for (let month = 1; month < 13; month++) {
      this.months.push(month);
    }
    // console.log(this.userRegister.controls.personalinfo.controls.preferredjobroles)
  }
  ngOnInit(): void {
    this.jobrolesarray = this.registrationservice.getjobroles();
    this.technologiesarray = this.registrationservice.gettechnologies();
  }

  userRegister = this._formBuilder.group({
    personalinfo: this._formBuilder.group({
      firstName: ['Parth', Validators.required],
      lastName: ['Patel', Validators.required],
      email: ['parth@xyz.com', Validators.required],
      phonenumber: ['12345', Validators.required],
      portfoliolink: [''],
      preferredjobroles: this._formBuilder.array([], Validators.required),
      referrer: [''],
      emailconsent: ['',]
    }),


    qualification: this._formBuilder.group({
      AggPercentage: ['80', Validators.required],
      yearpassing: ['2024', Validators.required],
      selecteddegree: ['Bachelor of Engineering', Validators.required],
      selectedstream: ['Design', Validators.required],
      selectedcollege: ['LDCE', Validators.required],
      collegenameinput: ['',],
      collegelocationinput: ['Ahmedabad', Validators.required],
      usertype: ['', Validators.required],

      fresherdetails: this._formBuilder.group({
        FreFamTech: this._formBuilder.array([],),
        FreOtherTechCkbox: ['',],
        FreOtherTech: ['',],
        fhasappearedbefore: ['',],
        froleappliedbefore: ['',]
      }),

      experienceddetails: this._formBuilder.group({

        yearsofexperience: ['',],
        currentctc: ['',],
        expectedctc: ['',],

        ExpExpertiseTech: this._formBuilder.array([],),
        ExpExpertiseOtherCkbox: ['',],
        ExpOtherExpertiseTech: ['',],

        ExpFamiliarTech: this._formBuilder.array([],),
        ExpFamiliarOtherCkbox: ['',],
        ExpOtherFamiliarTech: ['',],


        onnoticeperiod: ['',],
        noticeperiodenddate: ['',],
        noticeperiodlength: ['',],

        ehasappearedbefore: ['',],
        eroleappliedbefore: ['',],

      }),

    })
  });



  get personalInfoForm() {
    return (this.userRegister.get("personalinfo")) as FormGroup;
  }
  get qualificationInfoForm() {
    return this.userRegister.get("qualification") as FormGroup;
  }

  onRadioChange(myradio: any) {
    this.value = myradio.value;
    this.onlastpage = true;
  }


  dummyjobroles!: any[];
  showdummyjobroles!: any[];
  toshowjobroles: boolean = false;
  onPreferedRoleChange(jobrolesarrayid: Number, event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    if (isChecked) {
      this.userRegister.controls.personalinfo.controls.preferredjobroles.push(new FormControl(jobrolesarrayid));
    } else {
      let index = this.userRegister.controls.personalinfo.controls.preferredjobroles.controls.findIndex((x) => x.value == jobrolesarrayid);
      this.userRegister.controls.personalinfo.controls.preferredjobroles.removeAt(index);
    }

    console.log(this.userRegister.controls.personalinfo.controls.preferredjobroles.value);
    console.log('event fired');
    this.dummyjobroles = this.userRegister.controls.personalinfo.controls.preferredjobroles.value.sort();
    // console.log(this.dummyjobroles);
    // for(var i in this.dummyjobroles){
    //    this.showdummyjobroles.push(this.jobrolesarray[this.dummyjobroles[i]-1]);
    // }
    // console.log(this.showdummyjobroles)

    if (this.userRegister.controls.personalinfo.controls.preferredjobroles.controls.length != 0)
      this.toshowjobroles = true;


  }

  toshowFresherTech: boolean = false;
  dummyFreTech!: any[];
  OnFresherFamiliarTechChange(technologyid: Number, event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    if (isChecked) {
      this.userRegister.controls.qualification.controls.fresherdetails.controls.FreFamTech.push(new FormControl(technologyid));

    } else {
      let index = this.userRegister.controls.qualification.controls.fresherdetails.controls.FreFamTech.controls.findIndex((x) => x.value == technologyid);
      this.userRegister.controls.qualification.controls.fresherdetails.controls.FreFamTech.removeAt(index);
    }
    this.dummyFreTech = this.userRegister.controls.qualification.controls.fresherdetails.controls.FreFamTech.value.sort();
    console.log(this.userRegister.controls.qualification.controls.fresherdetails.controls.FreFamTech.value);
    if (this.userRegister.controls.qualification.controls.fresherdetails.controls.FreFamTech.controls.length != 0)
      this.toshowFresherTech = true;
  }

  toshowExpExpertiseTech: boolean = false;
  dummyExpExpertiseTech!: any[];
  OnExperiencedExpertiseTechChange(technologyid: Number, event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    if (isChecked) {
      this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpExpertiseTech.push(new FormControl(technologyid));
    } else {
      let index = this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpExpertiseTech.controls.findIndex((x) => x.value == technologyid);
      this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpExpertiseTech.removeAt(index);
    }
    this.dummyExpExpertiseTech = this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpExpertiseTech.value.sort();
    console.log(this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpExpertiseTech.value);
    if (this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpExpertiseTech.controls.length != 0)
      this.toshowExpExpertiseTech = true;
  }


  toshowExpFamiliarTech: boolean = false;
  dummyExpFamiliarTech!: any[];
  OnExperiencedFamiliarTechChange(technologyid: Number, event: Event) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    if (isChecked) {
      this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpFamiliarTech.push(new FormControl(technologyid));
    } else {
      let index = this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpFamiliarTech.controls.findIndex((x) => x.value == technologyid);
      this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpFamiliarTech.removeAt(index);
    }
    this.dummyExpFamiliarTech = this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpFamiliarTech.value.sort();
    console.log(this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpFamiliarTech.value);
    if (this.userRegister.controls.qualification.controls.experienceddetails.controls.ExpFamiliarTech.controls.length != 0)
      this.toshowExpFamiliarTech = true;
  }

  step1submitted() {
    var value = this.userRegister.value;
    this.pinfo = value.personalinfo;
    if (this.pinfo.firstName == '' || this.pinfo.lastName == '' || this.pinfo.email == '' || this.pinfo.phonenumber == '') {
      alert("Please Enter required input field");
      return;
    }
    if (this.userRegister.controls.personalinfo.controls.preferredjobroles.length == 0) {
      console.log("empty")
      return;
    }

    console.log(value.personalinfo);
  }

  step2submitted() {
    var value = this.userRegister.value;
    this.qinfo = value.qualification;
    if (this.qinfo.percentage = '' || this.qinfo.yearpassing == '' || this.qinfo.selecteddegree == '' || this.qinfo.selectedstream == '' ||
      this.qinfo.selectedcollege == '' || this.qinfo.collegelocationinput == '') {
      alert("Please enter all your educational details");
      return;
    }
    if (this.qinfo.usertype == "") {
      alert("Please enter your professional qualification details");
      return;
    }
    if (this.qinfo.usertype == "2") {
      if (this.qinfo.experienceddetails.noticeperiodenddate != '') {
        this.datestr = this.qinfo.experienceddetails.noticeperiodenddate.toLocaleDateString('en-us', { day: "numeric", month: "long", year: "numeric" });
      } else {
        this.datestr = '-';
      }
    }
    this.onlastpage = true;
    console.log(this.qinfo);
    console.log(this.qinfo.percentage.value)
  }



  handlesubmit() {
    if (this.userRegister.valid) {
      console.log(this.userRegister.value);
      this.previousbtn = true;
      this.formsubmitted = true;
    }
    else {
      alert("please submit all fields ")
    }
  }

}