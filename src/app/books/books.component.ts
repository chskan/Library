import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'Adz-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  messages: any;
  constructor(private bookService: BookService) {

  }

  ngOnInit() {
    this.messages = this.bookService.CheckLang();
  }
}
