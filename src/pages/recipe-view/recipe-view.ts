import { Component, OnDestroy, OnInit } from "@angular/core";
import { Events, IonicPage, NavController, NavParams } from "ionic-angular";
import { Media } from "./../../interfaces/media";
import { HelperProvider } from "./../../providers/helper/helper";
import { MediaProvider } from "./../../providers/media/media";
import { CommentsPage } from "./../comments/comments";

// TODO: Implement adding rating

@IonicPage()
@Component({
  selector: "page-recipe-view",
  templateUrl: "recipe-view.html"
})
export class RecipeViewPage implements OnInit, OnDestroy {
  recipe: Media;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public helperProvider: HelperProvider,
    public events: Events
  ) {}

  ngOnInit() {
    this.events.subscribe("star-rating:changed", starRating => {
      console.log(starRating);

      this.mediaProvider
        .addRating({
          file_id: this.recipe.file_id,
          rating: starRating
        })
        .subscribe(res => {
          console.log(res);
          this.mediaProvider.fetchMediaData();
        });
    });
  }

  ngOnDestroy() {}

  ionViewDidLoad() {
    this.recipe = this.navParams.get("item");
    console.log(this.recipe);
  }

  /**
   *
   *
   * @param {*} fileId
   * @memberof RecipeViewPage
   */
  showComments(fileId) {
    this.navCtrl.push(CommentsPage, {
      fileId: fileId
    });
  }

  addRating(file) {}
}
