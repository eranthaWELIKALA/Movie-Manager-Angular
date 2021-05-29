import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Language } from 'src/app/models/language';
import { Location } from 'src/app/models/location';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { Constants } from 'src/app/utils/contants';
import { WebServiceCallbackHandler } from 'src/app/utils/web-service-callback-handler';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent implements OnInit, WebServiceCallbackHandler {

  languages: Language[];
  locations: Location[];
  movie: Movie = new Movie();
  movieList = {
    titleColumn: {
      selection: "",
      value: "",
      select: true
    },
    descriptionColumn: {
      selection: "",
      value: "",
      select: true
    },
    yearColumn: {
      selection: "",
      value: "",
      select: true
    },
    castColumn: {
      selection: "",
      value: "",
      select: true
    },
    languageColumn: {
      selection: "",
      value: ""
    },
    locationColumn: {
      selection: "",
      value: "",
      select: true
    },
    locationPathColumn: {
      selection: "",
      value: "",
      select: true
    },
    imagePathColumn: {
      selection: "",
      value: "",
      select: true
    },
    watchedColumn: {
      selection: "",
      value: "",
      select: true
    }
  }
  keys = ["titleColumn", "descriptionColumn", "yearColumn", "castColumn", "languageColumn", "locationColumn", "locationPathColumn", "imagePathColumn", "watchedColumn"];
  imagePath = "url/image";
  fileImport = true;
  submitted = false;
  file = null;
  headers = null;
  rows = null;

  constructor(
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private router: Router
    ) {
      this.movie.watched = false;
     }

  ngOnInit(): void {
    this.getLanguages();
    this.getLocations();
  }

  onSuccess(callback: any, data: any) {
    callback(data);
  }
  onFail(errorCallback: any, error: any) {
    errorCallback(error);
  }

  getLanguages() {
    var callback = (data: any) => {
      console.log(data)
      this.languages = data.info;
      console.log("Languages");
      console.log(this.languages);
    }
    var errorCallback = (data: any) => {
      console.log(data);
    }
    this.movieService.getLanguages(this, callback, errorCallback);
  }

  getLocations() {
    var callback = (data: any) => {
      console.log(data)
      this.locations = data.info;
      console.log("Locations");
      console.log(this.locations);
    }
    var errorCallback = (data: any) => {
      console.log(data);
    }
    this.movieService.getLocations(this, callback, errorCallback);
  }

  getSantizeUrl(url : string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  changeTitle(variable) {
    console.log(variable)
  }

  addEditMovie(ngForm: NgForm) { 
    this.submitted = true;
    if (this.addEditMovieValidation(ngForm)) {
      var callback = (data: any) => {
        console.log(data);        
        this.resetForm();
      }
      var errorCallback = (data: any) => {
        console.log(data);
      }
      this.movieService.AddEditMovie(this.movie, this, callback, errorCallback);
    }
  }

  addEditMovieValidation(ngForm): boolean {
    if (ngForm.status == Constants.FORMCONTROL_STATUS.INVALID) {
      return false;
    }
    else {
      return true;
    }
  }

  resetForm() {
    this.router.navigateByUrl("/").then(()=>this.router.navigateByUrl("add-movie"));
    
  }

  showFileImport(fileImport) {
    this.fileImport = fileImport;
  }

  addfile(evt) {      
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      let data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(data);
      this.headers = data[0];
      this.rows = data.slice(1, data.length);
      console.log(this.rows);
    };
    reader.readAsBinaryString(target.files[0]);
  }   

  addEditMoviesList() {
    console.log(this.movieList);
  }

  columnSelected(columnIndex, variable) {
    let similarSelection = false;
    let field = null;
    this.keys.forEach(key => {
      if (key != variable) {
        if (this.movieList[key].selection == columnIndex.value) {
          similarSelection = true;
          field = key;
        }
      }
    });
    if (similarSelection) {
      this.movieList[variable].selection = "";
      alert(this.headers[columnIndex.value] + " is already selected for the " + field.replace("Column", "") +" field");
      columnIndex.control.setValue("");
    }
    console.log(this.movieList);
  }

  removeSelectedColumn(column) {
    this.movieList[column].selection = "";
    this.movieList[column].value = "";
  }

  typeColumnValue(column) {
    if (column == "titleColumn" && this.movieList[column].select) {
      alert("Title column can not have the same value for all the movies");
      return;
    }
    this.movieList[column].selection = "";
    this.movieList[column].value = "";
    this.movieList[column].select = !this.movieList[column].select;
  }

}
