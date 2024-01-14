import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardService } from 'src/app/services/card.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  showSpinner:boolean=false;
  constructor(
    private _snackBar: MatSnackBar,
    private dialogRef:MatDialogRef<CardModalComponent>,
    private fb:FormBuilder,
    private cardService:CardService,
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private snackBarService:SnackbarService

  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.cardForm=this.fb.group({
      name:[this.data?.name || '',Validators.maxLength(50)],
      title:[this.data?.title ||'',[Validators.required,Validators.maxLength(255)]],
      phone:[this.data?.phone ||'',[Validators.required,Validators.maxLength(20)]],
      email:[this.data?.email || '',[Validators.email,Validators.maxLength(50)]],
      address:[this.data?.address ||'',Validators.maxLength(255)],
    })
    
  }

  addCard():void{
    this.showSpinner=true;
    this.cardService.addCard(this.cardForm.value)
    .subscribe((res: any)=>{   
      this.getSuccess(res || 'Kartvizit başarıyla eklendi.');
    },(error:any)=>{
      this.getError(error.message || 'Kartvizit eklenirken bir sorun oluştur.');
    });
  }

  updateCard():void
  {
    this.showSpinner=true;
    this.cardService.updateCard(this.cardForm.value,this.data.id)
    .subscribe(res=>{
      this.getSuccess(res || 'Kartvizit başarıyla güncellendi.');
    },(error:any)=>{
      this.getError(error.message || 'Kartvizit güncellenirken bir sorun oluştur.');    
    });
  }

  deleteCard():void
  {
    this.showSpinner=true;
    this.cardService.deleteCard(this.data.id)
    .subscribe((res : any )=>{
      this.getSuccess(res || 'Kartvizit başarıyla silindi.');
    },(error:any)=>{
      this.getError(error.message || 'Kartvizit silinirken bir sorun oluştur.');
    });
  }

  getSuccess(message : string):void
  {
   this.snackBarService.createSnackBar('success',message);
    this.cardService.getCard();
    this.showSpinner=false;
    this.dialogRef.close();
  }


  getError(err : string):void
  {
    this.snackBarService.createSnackBar('error',err,);
    this.showSpinner=false;
  }

}
