import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { DisplayService } from '../services/display.service';
import { Router } from '@angular/router';
import { User } from '@firebase/auth-types';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {


  userL: User[];
  Characteristicsform: FormGroup;
  value1List: string[];
  value2List: string[];
  choices;
  myStrengths: string[];
  tmp;
  myStrengths2: string[];
  mySurvey: string[];
  flag: boolean[];
  showMySurvey: boolean;



  constructor(public db: DatabaseService, public ud: DisplayService, public router: Router,private cookieService:CookieService, private _firebaseAuth:AngularFireAuth) {
    this.choices = ['מאוד לא מתאים לי', 'לא מתאים לי', 'נייטרלי', 'מתאים לי', 'מאוד מתאים לי'];
    this.myStrengths = ['סקרנות', 'אהבת הלמידה', 'שיפוט', 'כושר המצאה', 'אינטליגנציה חברתית', 'פרספקטיבה',
    'תעוזה', 'התמדה', 'יושר', 'טוב לב', 'אהבה', 'אזרחות טובה', 'הגינות', 'מנהיגות', 'שליטה עצמית', 'זהירות',
    'ענווה', 'הערכה ליופי', 'הכרת תודה', 'תקווה', 'רוחניות', 'סלחנות', 'הומור', 'התלהבות' ];
    // tslint:disable-next-line:max-line-length
    this.myStrengths2 = [''];
    this.flag = [false, false, false, false, false, false, false, false, false, false, false, false,
       false, false, false, false, false, false, false, false, false, false, false, false, false];
     // tslint:disable-next-line:max-line-length
     this.value1List = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
     // tslint:disable-next-line:max-line-length
     this.value2List = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
     this.tmp = 0;
     this.showMySurvey = false;
     this.mySurvey = [
      '1: סקרנות: המשפט: אפילו שאני לבדי, אף פעם לא משעמם  לי',
      '2: סקרנות: המשפט: כשאני רוצה לדעת משהו, אני מחפש/ת בספר או במחשב יותר מרוב הילדים בני גילי',
      '3: אהבת הלמידה: המשפט: אני כולי התלהבות כשאני לומד/ת משהו חדש',
      '4: אהבת הלמידה: המשפט: אני שונא/ת לבקר במוזיאונים',
      '5: שיפוט: המשפט: כשעולה בעיה בזמן משחק או פעילות עם חברים, אני מצליח/ה בדרך-כלל להבין למה זה קרה',
      '6: שיפוט: המשפט: הורי תמיד אומרים לי שאני משתמש בשיפוט גרוע',
      '7: כושר המצאה: המשפט: יש לי תמיד רעיונות חדשים לדברים כיפיים שאפשר לעשות',
      '8: כושר המצאה: המשפט: יש לי דמיון פורה יותר מזה של רוב הילדים בגילי',
      '9: אינטליגנציה חברתית: המשפט: לא משנה באיזו קבוצת ילדים אני נמצא/ת, אני תמיד מתאים/מתאימה',
      '10: אינטליגנציה חברתית: המשפט: כשאני מרגיש/ה שמח/ה, עצוב/ה או כועס/ת, אני תמיד יודע/ת מדוע',
      '11: פרספקטיבה: המשפט: אנשים בוגרים אומרים לי שאני מתנהג/ת בבגרות רבה יחסית לגילי',
      '12: פרספקטיבה: המשפט: אני יודע/ת מהם הדברים החשובים באמת בחיים',
      '13: תעוזה: המשפט: אני עומד/ת על דעתי, גם כשאני פוחד/ת',
      '14: תעוזה: המשפט: גם אם עלולים ללעוג לי, אני עושה מה שנכון בעינַי',
      '15: התמדה: המשפט: הורי משבחים אותי תמיד על כך שאני משלים כל מטלה שנותנים לי',
      '16: התמדה: המשפט: כשאני מקבל/ת מה שרציתי, זה בזכות מאמץ רב שהשקעתי בשביל זה',
      '17: יושר: המשפט: אני לא קורא/ת לעולם יומן אישי או אי-מיילים של מישהו אחר',
      '18: יושר: המשפט: אני אשקר כדי להיחלץ מצרות',
      '19: טוב לב: המשפט: אני מתאמץ/מתאמצת להיות נחמד/ה לילדים חדשים בכיתה',
      '20: טוב לב: המשפט: בחודש האחרון עזרתי להורי או לשכנים בלי שביקשו ממני',
      '21: אהבה: המשפט: אני יודע/ת שאני האדם החשוב ביותר בחיים למישהו',
      '22: אהבה: המשפט: גם אם אני רב/ה הרבה עם אחי, אחותי או עם בני דודים - בכל זאת אני אוהב/ת אותם מאוד',
      '23: אזרחות טובה: המשפט: אני ממש נהנה/נהנית להשתייך למועדון או קבוצה, שלא במסגרת הלימודים',
      '24: אזרחות טובה: המשפט: בבית-הספר אני מצליח/ה לעבוד טוב מאוד בקבוצה',
      '25: הגינות:המשפט: גם כשאיני אוהב/ת מישהו, אני מתייחס/ת אליו בהגינוּת',
      '26: הגינות: המשפט: כשאני טועה, אני תמיד מודה בזה',
      '27: מנהיגות: המשפט: במשחק או בפעילות ספורטיבית עם ילדים אחרים, תמיד אני רוצה להיות המנהיג/ה',
      '28: מנהיגות: המשפט: כנהיג/ה זכיתי באמונם או בהערצתם של חברים או עמיתים בצוות',
      '29: שליטה עצמית: המשפט: אני מסוגל/ת בקלות להפסיק לשחק במחשב או לצפות בטלוויזיה כשעלי לעשות זאת',
      '30: שליטה עצמית: המשפט: אני מאחר/ת תמיד לכל דבר',
      '31: זהירות: המשפט: אני מתרחק/ת ממצבים ומילדים שעלולים לסבך אותי בצרות',
      '32: זהירות: המשפט: מבוגרים אומרים לי תמיד שאני מקבל/ת החלטות נבונות בדיבורים ובמעשים',
      '33: ענווה: המשפט: במקום לדבר על עצמי, אני מעדיף/ מעדיפה לתת לאחרים לדבר על עצמם',
      '34: ענווה: המשפט: אנשים מתארים אותי כשוויצר/ית',
      '35: הערכה ליופי:  המשפט: אני אוהב/ת להאזין למוסיקה או לצפות בסרטים או לרקוד או לראות הצגות תיאטרון - יותר מרוב הילדים',
      '36: הערכה ליופי:  המשפט: אני אוהב/ת לצפות בעצים משנים את צבעם בסתיו',
      '37: הכרת תודה: המשפט: כשאני חושב/ת על חיי, אני יוכל/ה למצוא דברים רבים שעליהם אני חש/ה הכרת תודה',
      '38: הכרת תודה: המשפט: שכחתי לומר למורים שלי תודה כשהם עזרו לי',
      '39: תקווה: המשפט: אני חושב/ת שבבגרותי אהיה אדם מאושר מאוד',
      '40: תקווה: המשפט: כשאני מקבל/ת ציון גרוע בבית הספר, אני חושב/ת תמיד על הפעם הבאה, שבה אצליח יותר',
      '41: רוחניות: המשפט: אני מאמין/מאמינה שכל אדם הוא מיוחד ויש לו מטרה חשובה בחיים',
      '42: רוחניות: המשפט: כשדברים משתבשים בחיי, אמונתי הדתית עוזרת לי להרגיש יותר טוב',
      '43: סלחנות: המשפט: כשמישהו פוגע ברגשותי, אני לעולם לא מנסה להשיב לו או לה כגמולם או לנקום בהם',
      '44: סלחנות: המשפט: אני סולח לאנשים על טעויותיהם',
      '45: הומור: המשפט: רוב הילדים יגידו שכיף להיות איתי',
      '46: הומור: המשפט: כשמישהו מחברי במצב רוח רע, או כשאני במצב רוח רע - אני אומר/ת משהו מצחיק כדי לשפר את המצב',
      '47: התלהבות: המשפט: אני אוהב את החיים שלי',
      '48: התלהבות: המשפט: כשאני מתעורר/ת בכל בוקר, אני מלא/ת שמחה לקראת היום החדש',
      'סיכום: '];
  }


  ngOnInit() 
    {
    this.validateForm();
    
     /* if(<User>this.cookieService.getObject('user')!=undefined)
      {
           this.db.loggedInUser = <User>this.cookieService.getObject('user');
           if(this.db.loggedInUser.type==='תלמיד' || this.db.loggedInUser.type==='מורה')
               this.router.navigate(['/'])
  
      }
     else
         this.router.navigate(['/'])*/
    
    
  }


  public validateForm() {
    // Limitations on fields in the registration form
    this.Characteristicsform = new FormGroup({
      'curiosity1': new FormControl(this.value1List[0], [
        Validators.required
      ]),
      'curiosity2': new FormControl(this.value2List[0], [
        Validators.required
      ]),

      /******************************************************/
      'studyLove1': new FormControl(this.value1List[1], [
        Validators.required
      ]),
      'studyLove2': new FormControl(this.value2List[1], [
        Validators.required
      ]),
      /*******************************************************/
      'judgment1': new FormControl(this.value1List[2], [
        Validators.required
      ]),
      'judgment2': new FormControl(this.value2List[2], [
        Validators.required
      ]),
      /*******************************************************/
      'inventiveness1': new FormControl(this.value1List[3], [
        Validators.required
      ]),
      'inventiveness2': new FormControl(this.value2List[3], [
        Validators.required
      ]),
      /*******************************************************/
      'socialIntelligence1': new FormControl(this.value1List[4], [
        Validators.required
      ]),
      'socialIntelligence2': new FormControl(this.value2List[4], [
        Validators.required
      ]),
      /*******************************************************/
      'perspective1': new FormControl(this.value1List[5], [
        Validators.required
      ]),
      'perspective2': new FormControl(this.value2List[5], [
        Validators.required
      ]),
      /*******************************************************/
      'courage1': new FormControl(this.value1List[6], [
        Validators.required
      ]),
      'courage2': new FormControl(this.value2List[6], [
        Validators.required
      ]),
      /*******************************************************/
      'persistence1': new FormControl(this.value1List[7], [
        Validators.required
      ]),
      'persistence2': new FormControl(this.value2List[7], [
        Validators.required
      ]),
      /*******************************************************/
      'integrity1': new FormControl(this.value1List[8], [
        Validators.required
      ]),
      'integrity2': new FormControl(this.value2List[8], [
        Validators.required
      ]),
      /*******************************************************/
      'Kindness1': new FormControl(this.value1List[9], [
        Validators.required
      ]),
      'Kindness2': new FormControl(this.value2List[9], [
        Validators.required
      ]),
      /*******************************************************/
      'love1': new FormControl(this.value1List[10], [
        Validators.required
      ]),
      'love2': new FormControl(this.value2List[10], [
        Validators.required
      ]),
      /*******************************************************/
      'GoodCitizenship1': new FormControl(this.value1List[11], [
        Validators.required
      ]),
      'GoodCitizenship2': new FormControl(this.value2List[11], [
        Validators.required
      ]),

      /*******************************************************/
      'fairness1': new FormControl(this.value1List[12], [
        Validators.required
      ]),
      'fairness2': new FormControl(this.value2List[12], [
        Validators.required
      ]),
      /*******************************************************/
      'leadership1': new FormControl(this.value1List[13], [
        Validators.required
      ]),
      'leadership2': new FormControl(this.value2List[13], [
        Validators.required
      ]),
      /*******************************************************/
      'selfControl1': new FormControl(this.value1List[14], [
        Validators.required
      ]),
      'selfControl2': new FormControl(this.value2List[14], [
        Validators.required
      ]),
      /*******************************************************/
      'Caution1': new FormControl(this.value1List[15], [
        Validators.required
      ]),
      'Caution2': new FormControl(this.value2List[15], [
        Validators.required
      ]),
      /*******************************************************/
      'humility1': new FormControl(this.value1List[16], [
        Validators.required
      ]),
      'humility2': new FormControl(this.value2List[16], [
        Validators.required
      ]),
      /*******************************************************/
      'beautyAppreciation1': new FormControl(this.value1List[17], [
        Validators.required
      ]),
      'beautyAppreciation2': new FormControl(this.value2List[17], [
        Validators.required
      ]),
      /*******************************************************/
      'gratitude1': new FormControl(this.value1List[18], [
        Validators.required
      ]),
      'gratitude2': new FormControl(this.value2List[18], [
        Validators.required
      ]),
      /*******************************************************/
      'hope1': new FormControl(this.value1List[19], [
        Validators.required
      ]),
      'hope2': new FormControl(this.value2List[19], [
        Validators.required
      ]),
      /*******************************************************/
      'spirituality1': new FormControl(this.value1List[20], [
        Validators.required
      ]),
      'spirituality2': new FormControl(this.value2List[20], [
        Validators.required
      ]),
      /*******************************************************/
      'forgiveness1': new FormControl(this.value1List[21], [
        Validators.required
      ]),
      'forgiveness2': new FormControl(this.value2List[21], [
        Validators.required
      ]),
      /*******************************************************/
      'humor1': new FormControl(this.value1List[22], [
        Validators.required
      ]),
      'humor2': new FormControl(this.value2List[22], [
        Validators.required
      ]),
      /*******************************************************/
      'enthusiasm1': new FormControl(this.value1List[23], [
        Validators.required
      ]),
      'enthusiasm2': new FormControl(this.value2List[23], [
        Validators.required
      ])
    });
  }

  showPart(i) {
    if (this.flag[i] === false) {
      this.flag[i] = true;
    } else {
      this.flag[i] = false;
    }
  }

  onNextClicked() {
    /*alert(this.value2List);
    alert(this.value1List);*/
    if (this.db.loggedInUser.SurveyCompleted === true) {
      alert('לא ניתן למלא שוב את השאלון');
      return;
    }
    for (let k = 0; k < 24 ; k++) {
      if (this.value1List[k] === '0' || this.value2List[k] === '0') {
        const j = k + 1 ;
        const str = [' חסר חלק מספר ' + j , ' יש למלא את כל הסעיפים' ];
        alert(str);
        return;
      }
    }
    for (let i = 0; i < 24 ; i++) {
      if (this.value1List[i] === this.choices[0]) {
        this.tmp = 1;
      }
      if (this.value1List[i] === this.choices[1]) {
        this.tmp = 2;
      }
      if (this.value1List[i] === this.choices[2] ) {
        this.tmp = 3;
      }
      if (this.value1List[i] === this.choices[3]) {
        this.tmp = 4;
      }
      if (this.value1List[i] === this.choices[4]) {
        this.tmp = 5;
      }

      /*alert(this.levels);*/
      if (this.value2List[i] === this.choices[0]) {
        this.tmp = this.tmp + 1;
      }
      if (this.value2List[i] === this.choices[1]) {
        this.tmp = this.tmp + 2;
      }
      if (this.value2List[i] === this.choices[2] ) {
        this.tmp = this.tmp + 3;
      }
      if (this.value2List[i] === this.choices[3]) {
        this.tmp = this.tmp + 4;
      }
      if (this.value2List[i] === this.choices[4]) {
        this.tmp = this.tmp + 5;
      }

      /*this.levels[i] = 1;
      alert(this.levels);*/
      if (this.tmp > 5) {
        this.myStrengths2[0] = this.myStrengths2[0] + ' ' + this.myStrengths[i] + ',';
      }
      this.myStrengths[i] = this.myStrengths[i] + ': ' + this.tmp;
      this.tmp = 0;
    }
    // tslint:disable-next-line:no-unused-expression
    for (let y = 0, z = 0 ; y < 48 && z < 24 ; y++, z++) {
      this.mySurvey[y] = this.mySurvey[y] + ' => ' + this.value1List[z];
      y++;
      this.mySurvey[y] = this.mySurvey[y] + ' => ' + this.value2List[z];
    }
    for (let y = 0; y < 24 ; y++) {
    this.mySurvey[48] = this.mySurvey[48] + ', ' + this.myStrengths[y];
    }
    this.db.updateStudentStrengths(this.myStrengths2, this.mySurvey);
    // tslint:disable-next-line:no-unused-expression
    this.showMySurvey = false;
  }
  viewSurvey() {
    this.myStrengths2 = this.db.loggedInUser.myStrengths;
    if (this.showMySurvey === false) {
      this.showMySurvey = true;
    } else {
      this.showMySurvey = false;
    }
  }
  logout() 
  {

    this.cookieService.putObject('user',undefined);

    this._firebaseAuth.auth.signOut()
    

    .then((res) => {  

      alert("יצא"+this.db.loggedInUser.email)
    this.db.loggedInUser.loggedIn = false;
    this.db.updateListing(this.db.loggedInUser.uid);
    this.db.loggedIn = 'false';
     this.router.navigate(['/'])
     


  })
    .catch((err) =>{
    console.log(err + "")
   // this.db.loggedInUser.loggedIn = true;
    // this.db.updateListing(this.db.loggedInUser.uid);
    }
    
    );
  }
}

