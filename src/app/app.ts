import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/shared/navbar/navbar';
import { Footer } from './components/shared/footer/footer';
import { Cta } from './components/shared/cta/cta';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Cta],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('soficloud-v1-2026');
}
