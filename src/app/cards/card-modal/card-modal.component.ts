import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { title } from 'process';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  constructor(
    private fb:FormBuilder,
    private cardService:CardService

  ) { }

  ngOnInit(): void {
    this.cardForm=this.fb.group({
      name:['',Validators.maxLength(50)],
      title:['',[Validators.required,Validators.maxLength(255)]],
      phone:['',[Validators.required,Validators.maxLength(20)]],
      email:['',[Validators.email,Validators.maxLength(50)]],
      address:['',Validators.maxLength(255)],
    })
    
  }

  addCard():void{
    this.cardService.addCard(this.cardForm.value)
    .subscribe((res: any)=>{
      console.log(res);
    })
  }
}
