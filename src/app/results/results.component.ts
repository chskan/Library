import { Component, Input, OnChanges, OnInit, SimpleChanges, DoCheck } from '@angular/core';
import { BookService } from '../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';
@Component({
  selector: 'Adz-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnChanges {


  @Input() bookName: string;
  displayedBooks = [];
  allBooks = [];
  categories = [];
  category = 'all';
  author = '';
  isLoading: boolean;
  isEmpty = false;
  messages: any;
  constructor(private bookService: BookService, private dialog: MatDialog) { }

  ngOnInit() {
    this.messages = this.bookService.CheckLang();
  }

  ngOnChanges() {
    if (this.bookName === '') {
      this.reset();
      console.log(this.displayedBooks);
    } else {
      this.search();

    }
  }

  search() {
    // Reset the categories
    this.category = 'all';
    this.isLoading = true;
    this.bookService.GetBooks(this.bookName).subscribe((data: any) => {

      this.allBooks = data.items;
      this.displayedBooks = this.allBooks;
      this.isLoading = false;
      this.fillCategories(data.items);
      this.checkIsEmpty();

    },
      err => {
        console.log(err);

      }
    );
  }


  // Ouvrir de la boîte de dialogue Détails et passer l'id du livre en tant que paramètre
  // Opening the Details Dialog and passing the bookId as a parameter
  openDetails(id: string) {
    this.dialog.open(DetailsComponent, {
      width: '800px',
      data: { id }
    });
  }


  fillCategories(array: any) {
    this.categories = [];
    // Ajout de la catégorie de chaque livre à un tableau
    // Adding the category of each book to an array
    array.forEach((element: any) => {
      if (element.volumeInfo.categories) {
        this.categories.push(element.volumeInfo.categories);
      }

    });

    // Suppression des redondances
    // Removing redundancies
    this.categories = Array.from(new Set(this.categories.map(data => data[0])));


  }

  // Filtrage des livres selon le nom d'auteur et/ou selon catégorie
  // Books filtering based on the author's name and/or category
  filter() {
    const filteredBooks = this.allBooks;
    this.displayedBooks = [];
    filteredBooks.forEach(book => {
      if (this.author !== '' && this.category === 'all') {
        // Certains livres n'ont aucun auteur (information non disponbile)
        // Some books don't have informations about the author
        if (book.volumeInfo.authors) {
          // Certains livres ont plus qu'un auteur
          // Some books were written by more than one writer
          book.volumeInfo.authors.forEach((element: string) => {
            if (element.toLowerCase().includes(this.author.toLowerCase())) {
              this.displayedBooks.push(book);
            }
          });
        }
      } else if (this.author === '' && this.category !== 'all') {
        // Certains livres n'appartient à aucune catégorie
        // Some books don't belong to any category
        if (book.volumeInfo.categories) {
          // Certains livres appartient à plus qu'une catégorie
          // Some books belong to more than one category
          book.volumeInfo.categories.forEach((element: string) => {
            if (element === this.category) {
              this.displayedBooks.push(book);
            }
          });
        }
      } else if (this.author !== '' && this.category !== 'all') {
        if (book.volumeInfo.categories && book.volumeInfo.authors) {
          book.volumeInfo.categories.forEach((cat: string) => {
            book.volumeInfo.authors.forEach((auth: string) => {
              if (cat === this.category && auth.toLowerCase().includes(this.author.toLowerCase())) {
                this.displayedBooks.push(book);
              }
            });

          });
        }
      } else {
        this.reset();
      }

      this.checkIsEmpty();



    });
  }

  // Réinitialiser les résultats
  // Reset search
  reset() {
    this.displayedBooks = this.allBooks;
  }

  // Vérifier si aucun résultat n'a été trouvé
  // Check if no results were found
  checkIsEmpty() {
    if (this.displayedBooks.length === 0) {
      this.isEmpty = true;
    }
  }

}
