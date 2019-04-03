import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import * as Firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  bookSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
  }

  emitBook() {
    this.bookSubject.next(this.books);
  }

  saveBooks() {
    Firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    Firebase.database().ref('/books')
      .on('value', (data: Firebase.database.DataSnapshot) => {
        this.books = data.val() ? data.val() : [];
        this.emitBook();
      });
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        Firebase.database().ref(`/books/${id}`).once('value').then(
          (data: Firebase.database.DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBook();
  }

  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBook();
  }
}
