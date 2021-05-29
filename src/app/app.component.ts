import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private httpClient: HttpClient) {
  }
  title = 'webscraper-ui';
  resultCardData : any = {
    pageTitle: "",
    htmlVersion: "",
    h1Length: 0,
    h2Length: 0,
    h3Length: 0,
    h4Length: 0,
    h5Length: 0,
    h6Length: 0,
    internalLinksLength: 0,
    externalLinksLength: 0,
    inAccessibleLinksLength: 0
  }
  testUrl = "";
  displayDataCard = false
  displaySpinnerCard = false

  getPageData(url: string): Observable<any> {
    var requestData = {
      "url": url
    }
    console.log(requestData)
    console.log(JSON.stringify(requestData))
    return this.httpClient.post("http://ec2-174-129-50-191.compute-1.amazonaws.com:8080/v0/PageDetails", JSON.stringify(requestData))
  }

  readURLValue(event : any) {
    this.testUrl = event.target.value
  }

  analyzeURL() {
    console.log(this.testUrl)
    this.displayDataCard = false
    this.displaySpinnerCard = true
    this.getPageData(this.testUrl).subscribe( res => {
      console.log(res)
      this.displayDataCard = true
      this.displaySpinnerCard = false
      this.resultCardData.pageTitle = res.pageTitle
      this.resultCardData.htmlVersion = res.htmlVersion
      this.resultCardData.h1Length = res.h1Length
      this.resultCardData.h2Length = res.h2Length
      this.resultCardData.h3Length = res.h3Length
      this.resultCardData.h4Length = res.h4Length
      this.resultCardData.h5Length = res.h5Length
      this.resultCardData.h6Length = res.h6Length
      this.resultCardData.internalLinksLength = res.internalLinks
      this.resultCardData.externalLinksLength = res.externalLinks
      this.resultCardData.inAccessibleLinksLength = res.inaccessibleLinks
    })
  }
}
