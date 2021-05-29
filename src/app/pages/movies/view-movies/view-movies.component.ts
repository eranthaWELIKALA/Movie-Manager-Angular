import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieService } from 'src/app/services/movie.service';
import { WebServiceCallbackHandler } from 'src/app/utils/web-service-callback-handler';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent implements OnInit, WebServiceCallbackHandler {
  @Input("searchTab") searchTab;
  @Input("searchResults") movies;
  selectedMovie: any = null;

  constructor(
    private movieService: MovieService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    if (!this.searchTab) {
      var callback = (data: any) => {
        this.movies = data.info;
        console.log(this.movies);
      }
      var errorCallback = (data: any) => {
        console.log(data);
      }
      this.movieService.getMovies(this, callback, errorCallback);
    }
  }

  onSuccess(callback: any, data: any) {
    callback(data);
  }
  onFail(errorCallback: any, error: any) {
    errorCallback(error);
  }

  viewMore(content, movie: any) {
    console.log("View More details of:" + JSON.stringify(movie));    
    this.selectedMovie = movie;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.selectedMovie = null;
    }, (reason) => {
      this.selectedMovie = null;
    });
  }

  getSantizeUrl(url : string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
