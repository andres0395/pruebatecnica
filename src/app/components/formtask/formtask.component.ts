import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tasks } from 'src/app/interfaces/task.interface';
import { StoreService } from 'src/app/services/store.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-formtask',
  templateUrl: './formtask.component.html',
  styleUrls: ['./formtask.component.scss'],
  imports:[ReactiveFormsModule,NgIf,NgFor,NgClass]
})
export class FormtaskComponent implements OnInit {
  private store = inject(StoreService);
  private formBuilder = inject(FormBuilder);
   formTask = this.formBuilder.nonNullable.group({
    title:['',Validators.required],
    dateLimit:['',Validators.required],
    completed:[false],
    personsAsociate:this.formBuilder.nonNullable.array([])
  });
  today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-' + new Date().getDate().toString().padStart(2, '0');
  ngOnInit(): void {
    this.addPerson()
  }
  filterEstate(estado: string){
    this.store.setEstate(estado);
  }
  get personsAsociate(): FormArray {
    return this.formTask.get('personsAsociate') as FormArray;
  }
  getSkills(index: number): FormArray {
    return (this.personsAsociate.at(index) as FormGroup).get('skils') as FormArray;
  }
  addPerson() {
    const personGroup = this.formBuilder.nonNullable.group({
      name: ['',[Validators.required,Validators.minLength(5)]],
      age: ['',[Validators.required, Validators.pattern('^[0-9]*$'),Validators.min(18)]],
      skils:this.formBuilder.nonNullable.array([])
    });
    // personGroup.value.skils?.push(this.formBuilder.control('',Validators.required));
    this.personsAsociate.push(personGroup);
    this.addSkill(this.personsAsociate.length -1);
  }
  addSkill(personIndex: number) {
    const skillsArray = this.getSkills(personIndex);
    skillsArray.push(this.formBuilder.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    const skillsArray = this.getSkills(personIndex);
    if (skillsArray.length > 0) {
      skillsArray.removeAt(skillIndex);
    }
  }
  removePerson(index: number) {
    this.personsAsociate.removeAt(index);
  }

  onSubmit() {
    const nameCount = this.formTask.value.personsAsociate?.reduce((acc:string[], obj:any) => {
      const res = this.formTask.value.personsAsociate?.filter((e:any)=>e.name.toUpperCase() == obj.name.toUpperCase());
        if(!!res && res.length>1)acc.push(obj.name);
      return acc;
    }, [] );
    let nameCount1 = [... new Set(nameCount)]
    if(!!nameCount1.length){
      Swal.fire({
        title:'Tiene seleccionadas a la misma persona varias veces verifique y vuelva a guardar',
        icon:'error'
      });
    }
    else if (this.formTask.valid ) {
      const task: Tasks = {
        title: this.formTask.getRawValue().title,
        dateLimit: this.formTask.getRawValue().dateLimit,
        completed: this.formTask.getRawValue().completed,
        personsAsociate: this.formTask.getRawValue().personsAsociate
      };
      this.store.updateData(task);
      this.formTask.reset();
      Swal.fire({
        icon:'success',
        title:'Tarea Creada Correctamente'
      })
    } else {
      Swal.fire({
        title:'Tiene campos vacios o valores invalidos',
        icon:'error'
      });
    }
  }
}
