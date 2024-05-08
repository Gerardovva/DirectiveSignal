import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
//las directivas tienen que ser declarasa en el modulo como si fuera un compomente, si se queiren usar fuera se tiene que exportar

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElemnt?: ElementRef<HTMLElement>
  private _color: string = 'red';
  private _errors?: ValidationErrors | null

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessange();

  }

  constructor(private el: ElementRef<HTMLElement>) {
    // console.log("constructor de la directiva");
    // console.log(el);
    this.htmlElemnt = el

  }
  ngOnInit(): void {
    // console.log("Directiva - ngOninit");
    this.setStyle()
  }

  setStyle(): void {
    if (!this.htmlElemnt) return;
    this.htmlElemnt.nativeElement.style.color = this._color
  }


  setErrorMessange(): void {
    if (!this.htmlElemnt) return;

    if (!this._errors) {
      this.htmlElemnt.nativeElement.innerText = ''
      return;
    }

    const errores = Object.keys(this._errors);
    console.log(errores);

    if (errores.includes('required')) {

      this.htmlElemnt.nativeElement.innerHTML = 'Este campo es requerido'
      return;
    }

    if (errores.includes('minLength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const currem = this._errors!['minlength']['actualLength'];

      this.htmlElemnt.nativeElement.innerHTML = `Minimo ${currem} /${min} caracteres`
      return;
    }

    if (errores.includes('email')) {

      this.htmlElemnt.nativeElement.innerHTML = `no tiene formato de correo`
      return;
    }



  }


}//cierre clase
