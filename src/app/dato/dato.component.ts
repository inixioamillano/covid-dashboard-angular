import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconDefinition, faCaretDown, faCaretUp, faEquals } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dato',
  templateUrl: './dato.component.html',
  styleUrls: ['./dato.component.css']
})
export class DatoComponent implements OnInit, OnChanges {

  @Input() nombre: string;
  @Input() numero: string;
  @Input() diferencia: Number;
  @Input() mostrarIncremento: boolean;
  icono: IconDefinition;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const diferencia = changes.diferencia.currentValue;
    this.icono = diferencia === 0 ? faEquals : diferencia > 0 ? faCaretUp : faCaretDown;
  }

  ngOnInit(): void {
    console.log(this.numero)
  }

}
