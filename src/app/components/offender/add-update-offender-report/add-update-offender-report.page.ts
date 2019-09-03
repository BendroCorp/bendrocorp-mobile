import { Component, OnInit } from '@angular/core';
import { OffenderService } from 'src/app/services/offender.service';
import { OffenderReport, Offender, ViolenceRating, Infraction, ForceLevel } from 'src/app/models/offender.model';
import { ModalController, PickerController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from 'src/app/services/profile.service';
import { Ship } from 'src/app/models/ship.models';
import { StarSystem, Planet, Moon } from 'src/app/models/system-map.model';
import { PickerOptions, PickerColumnOption } from '@ionic/core';
import { SystemMapService } from 'src/app/services/system-map.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-update-offender-report',
  templateUrl: './add-update-offender-report.page.html',
  styleUrls: ['./add-update-offender-report.page.scss'],
})
export class AddUpdateOffenderReportPage implements OnInit {
  offenderReport: OffenderReport;
  formAction: string;
  dataSubmitted: boolean = false;
  submitForApproval: boolean = false;

  // type arrays
  systemData: StarSystem[] = [];
  systemDataPlanets: Planet[] = [];
  systemDataMoon: Moon[] = [];
  shipData: Ship[] = [];
  violenceRatings: ViolenceRating[] = [];
  infractions: Infraction[];
  forceLevels: ForceLevel[] = [];

  constructor(
    private offenderService: OffenderService,
    private profileService: ProfileService,
    private systemMapService: SystemMapService,
    private modalController: ModalController,
    private pickerCtrl: PickerController,
    private messageService: MessageService
  ) { }

  addUpdateOffenderReport() {
    console.log(this.offenderReport);
    if (this.submitForApproval) {
      this.offenderReport.submitted_for_approval = true;
    }
    if (this.offenderReport && this.offenderReport.id && !this.offenderReport.report_approved) {
      this.offenderService.update(this.offenderReport).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.offenderService.refreshData();
          this.dismiss();
        } else {
          this.offenderReport.submitted_for_approval = false;
        }
      });
    } else {
      this.offenderService.create(this.offenderReport).subscribe((results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.offenderService.refreshData();
          this.dismiss();
        } else {
          this.offenderReport.submitted_for_approval = false;
        }
      });
    }
  }

  fetchInfractionIds(): number[] {
    if (this.offenderReport) {
      return this.offenderReport.infractions.map(x => x.id);
    }
  }

  checkInfractions(event) {
    console.log(event);
    console.log(event.detail.value);
    console.log(this.offenderReport.infractions);

    this.offenderReport.new_infractions = [];
    this.offenderReport.remove_infractions = [];

    event.detail.value.forEach(infractionId => {
      const infraction = this.infractions.find(x => x.id === infractionId);

      if (this.offenderReport.infractions.find(x => x.id === infraction.id)) {
        // then remove it
        this.offenderReport.remove_infractions.push(infraction);
      } else {
        // then add it
        this.offenderReport.new_infractions.push(infraction);
      }
    });

    console.log(this.offenderReport.new_infractions);
    console.log(this.offenderReport.remove_infractions);
  }

  async showShipPicker() {
    // https://ionicacademy.com/how-to-ion-picker-component/
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
          handler: (val) => {
            console.log(val.shipUsed.value);
            this.offenderReport.ship_id = parseInt(val.shipUsed.value);
          }
        }
      ],
      columns: [
        {
          name: 'shipUsed',
          options: this.shipData.sort((a, b) => a.name.localeCompare(b.name)).map((ship) => {
            return {
              text: ship.name,
              value: ship.id.toString(),
              selected: this.offenderReport.ship_id === ship.id
            } as PickerColumnOption;
          })
          // reference only
          // options: [
          //   { text: 'Angular', value: 'A' },
          //   { text: 'Vue', value: 'B' },
          //   { text: 'React', value: 'C' }
          // ]
        }
      ]
    };
    console.log(opts);
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onWillDismiss().then(async data => {
    });
  }

  async showViolencePicker() {
    // https://ionicacademy.com/how-to-ion-picker-component/
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
          handler: (val) => {
            console.log(val.violenceRating.value);
            this.offenderReport.violence_rating_id = parseInt(val.violenceRating.value);
          }
        }
      ],
      columns: [
        {
          name: 'violenceRating',
          options: this.violenceRatings.map((rating) => {
            return {
              text: rating.title,
              value: rating.id.toString(),
              selected: this.offenderReport.violence_rating_id === rating.id
            } as PickerColumnOption;
          })
          // reference only
          // options: [
          //   { text: 'Angular', value: 'A' },
          //   { text: 'Vue', value: 'B' },
          //   { text: 'React', value: 'C' }
          // ]
        }
      ]
    };
    console.log(opts);
    const picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onWillDismiss().then(async data => {
    });
  }

  // system map pickers
  async showSystemPicker() {
    // https://ionicacademy.com/how-to-ion-picker-component/
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
          handler: (val) => {
            this.offenderReport.system_id = parseInt(val.systemMapSystem.value);
          }
        }
      ],
      columns: [
        {
          name: 'systemMapSystem',
          options: this.systemData.map((system) => {
            return {
              text: system.title,
              value: system.id.toString(),
              // selected: this.offenderReport.violence_rating_id === rating.id
            } as PickerColumnOption;
          })
        }
      ]
    };
    console.log(opts);
    const picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onWillDismiss().then(async data => {
    });
  }

  async showPlanetPicker() {
    // https://ionicacademy.com/how-to-ion-picker-component/
    if (this.offenderReport && this.offenderReport.system_id) {
      let opts: PickerOptions = {
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Done',
            handler: (val) => {
              this.offenderReport.planet_id = parseInt(val.systemMapPlanet.value);
            }
          }
        ],
        columns: [
          {
            name: 'systemMapPlanet',
            options: this.systemDataPlanets.filter(x => x.orbits_system_id === this.offenderReport.system_id).map((planet) => {
              return {
                text: planet.title,
                value: planet.id.toString(),
                // selected: this.offenderReport.violence_rating_id === rating.id
              } as PickerColumnOption;
            })
          }
        ]
      };
      console.log(opts);
      const picker = await this.pickerCtrl.create(opts);
      picker.present();
      picker.onWillDismiss().then(async data => {
      });
    } else {
      this.messageService.alert('You must pick a system before you pick a planet!');
    }
  }

  async showMoonPicker() {
    // https://ionicacademy.com/how-to-ion-picker-component/
    if (this.offenderReport && this.offenderReport.planet_id) {
      let opts: PickerOptions = {
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Done',
            handler: (val) => {
              this.offenderReport.moon_id = parseInt(val.systemMapMoon.value);
            }
          }
        ],
        columns: [
          {
            name: 'systemMapMoon',
            options: this.systemDataMoon.filter(x => x.orbits_planet_id === this.offenderReport.planet_id).map((moon) => {
              return {
                text: moon.title,
                value: moon.id.toString(),
                // selected: this.offenderReport.violence_rating_id === rating.id
              } as PickerColumnOption;
            })
          }
        ]
      };
      console.log(opts);
      const picker = await this.pickerCtrl.create(opts);
      picker.present();
      picker.onWillDismiss().then(async data => {
      });
    } else {
      this.messageService.alert('You must pick a planet before you pick a moon!');
    }
  }

  offenderSelectedSystem() {
    return (this.offenderReport && this.offenderReport.system_id && this.systemData.find(x => x.id === this.offenderReport.system_id)) ? this.systemData.find(x => x.id === this.offenderReport.system_id).title : 'System';
  }

  offenderSelectedPlanet() {
    return (this.offenderReport && this.offenderReport.planet_id && this.systemDataPlanets.find(x => x.id === this.offenderReport.planet_id)) ? this.systemDataPlanets.find(x => x.id === this.offenderReport.planet_id).title : 'Planet';
  }

  offenderSelectedMoon() {
    return (this.offenderReport && this.offenderReport.moon_id && this.systemDataMoon.find(x => x.id === this.offenderReport.moon_id)) ? this.systemDataMoon.find(x => x.id === this.offenderReport.moon_id).title : 'Moon';
  }

  offenderSelectedViolenceRating() {
    return (this.offenderReport && this.offenderReport.violence_rating_id && this.violenceRatings.find(x => x.id === this.offenderReport.violence_rating_id)) ? this.violenceRatings.find(x => x.id === this.offenderReport.violence_rating_id).title : 'None';
  }

  offenderSelectedShip() {
    return (this.offenderReport && this.offenderReport.ship_id && this.shipData.find(x => x.id === this.offenderReport.ship_id)) ? this.shipData.find(x => x.id === this.offenderReport.ship_id).name : 'None';
  }

  occuredWhenChanged(event) {
    this.offenderReport.occured_when_ms = new Date(this.offenderReport.occured_when).getTime();
    // console.log(this.offenderReport.occured_when_ms);
  }

  offenderReportFormInvalid() {
    // Infractions committed can't be blank,
    // Violence rating must exist,
    // Force level applied must exist,
    // Offender offender handle can't be blank
    // console.log(this.offenderReport);
    // console.log('');
    // console.log(`Description ${this.offenderReport.description && this.offenderReport.description.length > 20}`);
    // console.log(`Occured ${this.offenderReport.occured_when_ms}`);
    // console.log(`infractions ${this.offenderReport.infractions && this.offenderReport.infractions.length > 0}`);
    // console.log(`violence_rating_id ${this.offenderReport.violence_rating_id}`);
    // console.log(`force_level_applied_id ${this.offenderReport.force_level_applied_id}`);

    if (this.offenderReport && this.offenderReport.id) {
      return (
        this.offenderReport &&
        (this.offenderReport.description && this.offenderReport.description.length > 20) &&
        (this.offenderReport.occured_when_ms) &&
        // (this.offenderReport.system_id) &&
        (this.offenderReport.infractions && this.offenderReport.infractions.length > 0) &&
        (this.offenderReport.violence_rating_id) &&
        (this.offenderReport.force_level_applied_id)
      ) ? true : false;
    } else {
      return (
        this.offenderReport &&
        (!this.offenderReport.offender_attributes || (this.offenderReport.offender_attributes.offender_handle && this.offenderReport.offender_attributes.offender_handle.length > 1)) &&
        (this.offenderReport.description && this.offenderReport.description.length > 20) &&
        (this.offenderReport.occured_when_ms) &&
        // (this.offenderReport.system_id) &&
        (this.offenderReport.infractions && this.offenderReport.infractions.length > 0) &&
        (this.offenderReport.violence_rating_id) &&
        (this.offenderReport.force_level_applied_id)
      ) ? true : false;
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  ngOnInit() {
    this.systemMapService.list().subscribe((results) => {
      if (!(results instanceof HttpErrorResponse)) {
        this.systemData = results;

        let tempPlanetArray = [];
        let tempMoonArray = [];
        this.systemData.forEach(element => {
          tempPlanetArray.push(tempPlanetArray.concat(element.planets));
          element.planets.forEach(element => {
            tempMoonArray.push(tempMoonArray.concat(element.moons));
          });
        });

        // this is some awesome fun here
        this.systemDataPlanets = tempPlanetArray.flat(Infinity).filter((obj: Planet, pos, arr) => {
          return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
        });
        this.systemDataMoon = tempMoonArray.flat(Infinity).filter((obj: Moon, pos, arr) => {
          return arr.map(mapObj => mapObj['id']).indexOf(obj['id']) === pos;
        });

        console.log(this.systemDataPlanets);
        console.log(this.systemDataMoon);
      }
    });

    this.offenderService.list_rating().subscribe(
      (results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.violenceRatings = results;
        }
      }
    );

    this.profileService.list_ships().subscribe(
      (results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.shipData = results;
        }
      }
    );

    this.offenderService.list_infractions().subscribe(
      (results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.infractions = results;
        }
      }
    );

    this.offenderService.list_force_level().subscribe(
      (results) => {
        if (!(results instanceof HttpErrorResponse)) {
          this.forceLevels = results;
        }
      }
    );

    // deal with the actual report object
    if (this.offenderReport && this.offenderReport.id) {
      console.log(this.offenderReport);
      this.formAction = 'Update';
    } else {
      this.offenderReport = { offender_attributes: { } as Offender, new_infractions: [], remove_infractions: [], infractions: [] } as OffenderReport;
      console.log(this.offenderReport);
      this.formAction = 'Create';
    }
  }

}
