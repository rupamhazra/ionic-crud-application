import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { LoadingService } from '../../core/services/loading.service';
import { ToasterService } from '../../core/services/toaster.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  medie_url:any = environment.imageURL
  visibleKey: boolean = false;
  result:[];
  selectedCategory:  {};
  constructor(
    private categoryService: CategoryService,
    private toasterService: ToasterService,
    public loadingService : LoadingService,
    
  ) {
    
   }

  ngOnInit() {
    this.loadingService.present();
    this.readCategories()
  }
  readCategories()
  {

    //this.categories =[];
    this.categoryService.readCategories().subscribe( 
      res => {
        this.result = res.result;
        console.log(this.result);
        this.loadingService.dismiss();
        console.log("afterrrrrrrrrrrr");
        this.visibleKey = true;
      },
    error => {
      console.log("error::::"+error);
      this.loadingService.dismiss();
      this.visibleKey = true;
      this.toasterService.showToast(error.error.msg,2000)

    }
    )
  }
}
