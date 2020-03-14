import { Component, OnInit } from '@angular/core';
//Add Hero interface
import { Hero } from '../hero';
//Add Heroes
//import {HEROES} from '../mock-heroes';
//Import service
import {HeroService} from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
//Add properties
selectedHero: Hero;
heroes:Hero[];
  constructor(private heroService:HeroService, private messageService:MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }
  /*onSelect(hero: Hero): void{
    this.selectedHero = hero;
    this.messageService.add(`HeroService: Selected hero id=${hero.id}`);
  }*/
  getHeroes():void{
   this.heroService.getHeroes().subscribe(data=>{
     this.heroes = data;
   });
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
