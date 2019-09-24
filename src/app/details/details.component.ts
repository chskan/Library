import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from '../services/book.service';

@Component({
  selector: 'Adz-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  book: any;
  isLoading = true;
  messages: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private bookService: BookService) { }

  ngOnInit() {
    this.messages = this.bookService.CheckLang();
    this.bookService.GetBook(this.data.id).subscribe((data: any) => {
      this.book = data;
      this.isLoading = false;
    });

  }

}
