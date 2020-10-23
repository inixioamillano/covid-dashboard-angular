import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { PwaService } from './services/pwa-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public zonas = [];
  public zonaSeleccionada = null;
  public datos = [];
  public hoy = null;
  public ayer = null;
  public loading = true;

  Highcharts: typeof Highcharts = Highcharts;
  IncidenciaAcumuladaOptions: Highcharts.Options;
  AcumuladosOptions: Highcharts.Options;
  DiariosOptions: Highcharts.Options;
  MensualOptions: Highcharts.Options;

  constructor(private datePipe: DatePipe, public Pwa: PwaService) {
    
  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }

  cambiarZona = (zona): any => {
    this.setLoading();
    localStorage.setItem('miZona', zona);
    console.log(zona)
    fetch('http://localhost:8080/datosporzona?code='+zona)
          .then(res => res.json()
            .then(json => {
              this.datos = json;
              this.hoy = this.datos[this.datos.length-1];
              this.ayer = this.datos[this.datos.length-2];
              this.IncidenciaAcumuladaOptions = {
                title: {text: "Incidencia acumulada"},
                xAxis: {categories: this.datos.map(d => this.datePipe.transform(d.fecha, 'dd/MM/yyyy'))},
                yAxis: {title: {text: 'Casos/100.000 habitantes'}},
                series: [{
                  name: 'Casos en los últimos 14 días/100.000 habitantes',
                  data: this.datos.map(d => Number.parseFloat(d.ia14.toFixed(2))), 
                  type: 'line'
                }, {
                  name: 'Casos en los últimos 7 días/100.000 habitantes',
                  data: this.datos.map(d => Number.parseFloat(d.ia7.toFixed(2))),
                  type: 'line'
                }]
              };
              this.AcumuladosOptions = {
                title: {text: "Casos acumulados"},
                xAxis: {categories: this.datos.map(d => this.datePipe.transform(d.fecha, 'dd/MM/yyyy'))},
                yAxis: {title: {text: 'Casos'}},
                series: [{
                  name: 'Casos acumulados',
                  type: 'line',
                  data: this.datos.map(d => d.acumulados)
                }]
              }
              this.DiariosOptions = {
                title: {text: "Casos diarios"},
                xAxis: {categories: this.datos.map(d => this.datePipe.transform(d.fecha, 'dd/MM/yyyy'))},
                yAxis: {title: {text: 'Casos'}},
                series: [{
                  name: 'Casos diarios',
                  type: 'column',
                  data: this.datos.map(d => d.infectadosHoy)
                }]
              }
              let totalMensual = {};
              this.datos.map(d => {
                const mes =  this.datePipe.transform(d.fecha, 'MM/yyyy');
                totalMensual[mes] = totalMensual[mes] ? totalMensual[mes] + d.infectadosHoy : d.infectadosHoy;
              })
              this.MensualOptions = {
                title: {text: "Casos mensuales"},
                xAxis: {categories: Object.keys(totalMensual)},
                yAxis: {title: {text: "Casos"}},
                series: [{
                  name: "Casos mensuales",
                  type: "column",
                  data: Object.values(totalMensual)
                }]
              }
              this.setLoaded();
            })
          )
    
  }

  ngOnInit(): void {
    fetch('http://localhost:8080/zonas')
    .then(res => res.json()
      .then(json => {
        const zonaGuardada = localStorage.getItem('miZona');
        this.zonas = json;
        const zona = zonaGuardada ? this.zonas.find(z => z.code === zonaGuardada) :  this.zonas[0];
        this.zonaSeleccionada = zonaGuardada || json[0].code;
        if (zona) {
          this.cambiarZona(zona.code)
        }
      })
    )
  }

  setLoaded = () => {
    this.loading = false;
    document.getElementsByTagName("footer")[0].classList.remove("hidden")
  }

  setLoading = () => {
    this.loading = true;
    document.getElementsByTagName("footer")[0].classList.add("hidden")
  }
}
