import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  // Clé ajoutée pour illimiter l'utilisation de l'API
  // Added Key to unlimit the usage of the API
  key = 'key=AIzaSyA2JCU0eak8IzdQeDyiPdehybKVfVO7C38';
  // Limiter la recherche aux livres et définir maxResults sur la valeur maximale autorisée, 40.
  // Limited the search to only books and set maxResults to the maximum allowable value which is 40.
  searchUrl = 'https://www.googleapis.com/books/v1/volumes?maxResults=40&printType=books&q=intitle:';
  detailsUrl = 'https://www.googleapis.com/books/v1/volumes/';
  langUrl = '&langRestrict=';

  messagesEn = {
    searchabook: 'Search a book',
    reset: 'Reset results',
    category: 'Categories',
    author: 'Filter by author',
    authorName: 'Author(s)',
    publisher: 'Publisher(s)',
    published: 'Published',
    read: 'read',
    all: 'All',
    noresults: 'No results found'
  };

  messagesFr = {
    searchabook: 'Chercher un livre',
    reset: 'Réinitialiser les résultats',
    category: 'Catégories',
    author: 'Filtrer par auteur',
    authorName: 'Auteur(s)',
    publisher: 'Éditeur(s)',
    published: 'Publié le',
    read: 'Lire',
    all: 'Tous',
    noresults: 'Aucun résultat trouvé'
  };


  constructor(private http: HttpClient) {
    if (navigator.language.includes('fr')) {
      this.langUrl += 'fr';
    } else {
      this.langUrl += 'en';
    }
  }



  GetBooks(bookName: string) {
    return this.http.get(this.searchUrl + bookName + '&' + this.key + this.langUrl);
  }

  GetBook(id: string) {
    return this.http.get(this.detailsUrl + id + '?' + this.key + this.langUrl);
  }

  Filter(author: string, category: string, bookName: string) {
    if (author !== '') {
      return this.http.get(this.searchUrl + bookName + '+inauthor:' + author + '&' + this.key + this.langUrl);
    }
    if (category !== 'all') {
      return this.http.get(this.searchUrl + bookName + '+subject:' + category + '&' + this.key + this.langUrl);
    }
    if (category !== 'all' && author !== '') {
      return this.http.get(this.searchUrl + bookName + '+subject:' + category + + '+inauthor:' + author + '&' + this.key + this.langUrl);
    }
  }

  CheckLang() {
    if (navigator.language.includes('fr')) {
      return this.messagesFr;
    } else {
      return this.messagesEn;
    }
  }
}
