import Vue from 'vue';
import { Library } from './library.js';
import { Book } from './book.js';
import "nes.css/css/nes.min.css";
import './style/style.css';

const Index = (() => {
	const myLibrary = new Library();
	const myBook = new Book("The Hobbit", "J.R.R. Tolkien", "300", true);
	myLibrary.addBook(myBook);

	Vue.component('library-header', {
		props: [],
		data(){
			return{
				isVisible: true
			}
		},
		template: `
			<div class="header">
				<button type="button" class="nes-btn is-primary" @click="renderAddBook">Add Book</button>
				<br><br>
				<form-add-book v-show="isVisible"></form-add-book>
			</div>
		`,
		methods: {
			renderAddBook(){
				if(this.isVisible == false)
					this.isVisible = true;
				else
					this.isVisible = false;
			}
		}
	});

	Vue.component('form-add-book', {
		template: `
			<form class="form">
				<div class="nes-field">
					<label for="title">Title</label>
					<input type="text" id="title" class="nes-input" required>
				</div>
				<div class="nes-field">
					<label for="author">Author</label>
					<input type="text" id="author" class="nes-input" required>
				</div>
				<div class="nes-field">
					<label for="pages">Pages</label>
					<input type="number" id="pages" class="nes-input" required>
				</div>
				<div class="nes-field submit-button-container">
					<label>
						<input type="checkbox" class="nes-checkbox" checked />
						<span>Read It?</span>
					</label>
					<input type="submit" class="nes-btn is-success submit-button" value="Add">
				</div>
			</form>
		`
	});

	Vue.component('book', {
		props: [],
		data() {
			return {
			};
		},
		template: `
			<div class="book nes-container is-rounded">
				<slot></slot>
				<span>
					<button type="button" class="nes-btn is-primary" @click="changeRead">Read?</button>
					<button type="button" class="nes-btn is-warning" @click="deleteBook">Delete</button>
				</span>
			</div>
		`,
		methods: {
			changeRead(){
				alert("read");
			},
			deleteBook(){
				alert("delete");
			}
		}
	});

	Vue.component('library', {
		props: [],
		data() {
			return {
				books: myLibrary.books
			};
		},
		template: `
			<div>
				<book v-for="book in books">{{ book.info() }}</book>
			</div>
		`,
		methods: {
		}
	});

	const render = () => {
		new Vue({
			el: '#main',
			data: {
				books: myLibrary.books
			}
		});
	}

	return { render };
})();

Index.render();
