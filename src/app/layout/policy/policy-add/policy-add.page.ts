import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { PolicyService } from '../../../core/services/policy.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToasterService } from '../../../core/services/toaster.service';
import { Router } from  "@angular/router";
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { LoadingService } from '../../../core/services/loading.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';


const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-policy-add',
  templateUrl: './policy-add.page.html',
  styleUrls: ['./policy-add.page.scss'],
})
export class PolicyAddPage implements OnInit {
  form: FormGroup;
  visibleKey: boolean;
  policies:any;
  selectedPolicy:  {};
 
  public hasBaseDropZoneOver: boolean = false;
  image:any;
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy:number;
  geoAddress: string;
 
  watchLocationUpdates:any; 
  loading:any;
  isWatching:boolean;
  // images = [];
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  constructor(
    private formBuilder: FormBuilder,
    private policyService: PolicyService,
    private toasterService: ToasterService,
    public loadingService : LoadingService,
    private  router:  Router,
    private camera: Camera, 
    private file: File, 
    private webview: WebView,
    private storage: Storage, 
    private plt: Platform,
    private filePath: FilePath,
    private actionSheetCtrl: ActionSheetController,
    private ref: ChangeDetectorRef,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
    
    ) {}
  ngOnInit() {

    // this.geolocation.getCurrentPosition().then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   console.log('resp.coords',resp)
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });


    this.plt.ready().then(() => {
      this.loadStoredImage();
    });
    this.form = this.formBuilder.group({
      number: ['', Validators.required],
      amount: ['', Validators.required],
      
    });
    console.log('image',this.image)
    
  }
  //Get current coordinates of device
  getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude; 
      this.geoAccuracy = resp.coords.accuracy; 
      this.getGeoencoder(this.geoLatitude,this.geoLongitude);
     }).catch((error) => {
       alert('Error getting location'+ JSON.stringify(error));
     });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude,longitude){
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderResult[]) => {
      this.geoAddress = this.generateAddress(result[0]);
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

   //Return Comma saperated address
   generateAddress(addressObj){
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      address += obj[val]+', ';
    }
  return address.slice(0, -2);
}
//Start location update watch
watchLocation(){
  this.isWatching = true;
  this.watchLocationUpdates = this.geolocation.watchPosition();
  this.watchLocationUpdates.subscribe((resp) => {
    this.geoLatitude = resp.coords.latitude;
    this.geoLongitude = resp.coords.longitude; 
    this.getGeoencoder(this.geoLatitude,this.geoLongitude);
  });
}

//Stop location update watch
stopLocationWatch(){
  this.isWatching = false;
  this.watchLocationUpdates.unsubscribe();
}
  loadStoredImage() {
    this.storage.get(STORAGE_KEY).then(image => {
      if (image) {
        let arr = JSON.parse(image);
        console.log('arr===================>'+arr);
        let filePath = this.file.dataDirectory + arr;
        let resPath = this.pathForImage(filePath);
        this.image = { name: arr, path: resPath, filePath: filePath };
      }
    });
  }
  // loadStoredImages() {
  //   this.storage.get(STORAGE_KEY).then(images => {
  //     if (images) {
  //       let arr = JSON.parse(images);
  //       this.images = [];
  //       for (let img of arr) {
  //         let filePath = this.file.dataDirectory + img;
  //         let resPath = this.pathForImage(filePath);
  //         this.images.push({ name: img, path: resPath, filePath: filePath });
  //       }
  //     }
  //   });
  // }
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
  async selectImage() {
    const actionSheet = await this.actionSheetCtrl.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () =>  {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
  }
  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        allowEdit: true,
        quality: 50,
        targetWidth: 500,
        targetHeight: 500,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.PNG
    };
 
    this.camera.getPicture(options).then(imagePath => {
        if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
        } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
    });
 
}
createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".png";
    return newFileName;
}
 
copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        this.updateStoredImages(newFileName);
    }, error => {
        //this.presentToast('Error while storing file.');
    });
}
 
updateStoredImages(name) {
  console.log('name===>',name);
    this.storage.get(STORAGE_KEY).then(image => {
        let arr = JSON.parse(image);
        console.log('arr===>'+arr);
        if (!arr) {
            let newImages = [name];
            this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
        } else {
            arr.push(name);
            this.storage.set(STORAGE_KEY, JSON.stringify(arr));
        }
        
        let filePath = this.file.dataDirectory + name;
        let resPath = this.pathForImage(filePath);
 
        this.image = {
          name: name,
          path: resPath,
          filePath: filePath
        };
        console.log('image====>'+image)
        this.ref.detectChanges(); // trigger change detection cycle
    });
}
deleteImage(imgEntry, position) {
  this.image.splice(position, 1);

  this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

      var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

      this.file.removeFile(correctPath, imgEntry.name).then(res => {
          //this.presentToast('File removed.');
      });
  });
}

startUpload(imgEntry) {
  this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
          ( < FileEntry > entry).file(file => this.readFile(file))
      })
      .catch(err => {
        console.log('Error while reading file.')
          //this.presentToast('Error while reading file.');
      });
}

readFile(file: any) {
  const reader = new FileReader();
  reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
          type: file.type
      });
      formData.append('file', imgBlob, file.name);
      formData.append('number',this.form.value.number);
      formData.append('amount',this.form.value.amount);
      this.uploadImageData(formData);
  };
  reader.readAsArrayBuffer(file);
}

uploadImageData(formData: FormData) {
  console.log('started...')
  this.loadingService.present();
  this.policyService.createPolicy(formData).subscribe(
      res => {
            console.log('res===>',res)
            this.loadingService.dismiss();
            this.toasterService.showToast(res.msg,2000);
      },
      error => {
        console.log("error::::"+error);
        this.toasterService.showToast(error.error.msg,2000)
      }
      
      );
}
  addPolicy(){
    console.log('check')
    this.policyService.createPolicy(this.form.value).subscribe(res=>{
      console.log("Policy created, ", res);
      this.toasterService.showToast(res.msg,2000)
      this.router.navigateByUrl('/policy/policy-list');
    },
    error => {
      console.log("error::::"+error);
      this.toasterService.showToast(error.error.msg,2000)
    }
    );
  }
  
}
