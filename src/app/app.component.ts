import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RagApiService } from './services/rag-api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Ragnarok-MVP-Tracker';
  idList = ["3505", "1087", "1147", "1190"];
  idObjects = [
    {
      id: "3505",
      name: "Orc Heroi"
    }
  ]

  constructor(
    private ragService: RagApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    console.log("app component");
    this.ragService.getAllMVPS(this.idList).subscribe(res => {
      console.log("res: ", res);
    })

  }
}


