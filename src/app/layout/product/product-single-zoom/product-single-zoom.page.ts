import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-single-zoom',
  templateUrl: './product-single-zoom.page.html',
  styleUrls: ['./product-single-zoom.page.scss'],
})
export class ProductSingleZoomPage implements OnInit {
  productId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.params['id']
    console.log('productId',this.productId)
    this.viewProductImageSlider();
  }

  viewProductImageSlider(){
      
  }

}
