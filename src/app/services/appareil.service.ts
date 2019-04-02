import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppareilService {

    appareilsSubject = new Subject<any[]>();
    private appareils = [];

    constructor(private httpClient: HttpClient) { }

    emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice());
    }

    switchOnOne(i: number) {
        this.appareils[i].status = 'allumé';
    }

    switchOffOne(i: number) {
        this.appareils[i].status = 'éteint';
    }

    switchOnAll() {
        for (const appareil of this.appareils) {
            appareil.status = 'allumé';
        }
    }

    switchOffAll() {
        for (const appareil of this.appareils) {
            appareil.status = 'éteint';
        }
    }

    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (s) => {
                return s.id === id;
            }
        );
        return appareil;
    }

    addAppareil(name: string, status: string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
        this.httpClient
            .put('https://ocr-cours-c0a6c.firebaseio.com/appareils.json', this.appareils)
            .subscribe(
                () => {
                    console.log('Enregistremement terminé !');
                },
                (error) => {
                    console.log(`Erreur ! : ${error}`);
                }
            );
    }

    getAppareilsFromServer() {
        this.httpClient
            .get<any[]>('https://ocr-cours-c0a6c.firebaseio.com/appareils.json')
            .subscribe(
                (response) => {
                    this.appareils = response;
                    this.emitAppareilSubject();
                },
                (error) => {
                    console.log(`Erreur ! : ${error}`);
                }
            );
    }
}
