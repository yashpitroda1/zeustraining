import { Injectable } from '@angular/core';
import { JobRole, Technology } from './registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private jobrolesarray: JobRole[] = [
    new JobRole(1, "Instructional Engineer"),
    new JobRole(2, 'Software Engineer'),
    new JobRole(3, 'Software Quality Engineer')
  ];

  private technologiesarray: Technology[] = [
    new Technology(1, "Javascript"),
    new Technology(2, "Angular"),
    new Technology(3, "React"),
    new Technology(4, "Node"),
    new Technology(5, "Other")
  ]

  constructor() { }

  getjobroles() {
    return this.jobrolesarray.slice();
  }

  gettechnologies() {
    return this.technologiesarray.slice();
  }

}

