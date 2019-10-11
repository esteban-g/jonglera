import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

declare var coachdata: any;

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  private db: SQLiteObject;
  private isOpen: boolean;
  public existsUser: boolean;
  public existsDefault3Questions: boolean;
  public idUser: number;
  public idCOach: number;
  public nameCoach: any;
  public iconCOach: any;

  public fullarraycoach: any;

public testidquest: number;


  constructor(public http: HttpClient,
    public storage: SQLite
  ) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      //            db.executeSql("CREATE TABLE IF NOT EXISTS events  (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, location TEXT, notes TEXT, startDate TEXT, endDate TEXT, id_users INTEGER)", [])            
      //            db.executeSql("CREATE TABLE IF NOT EXISTS sessions_plans  (id_sessions INTEGER, id_plans INTEGER, PRIMARY KEY (id_sessions, id_plans), FOREIGN KEY (id_sessions) REFERENCES sessions ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (id_plans) REFERENCES plans ON DELETE CASCADE ON UPDATE NO ACTION)", [])

      this.storage.create({ name: "activitydata.db", location: "default" }).then(
        (db: SQLiteObject) => {
          this.db = db;
          db.executeSql("CREATE TABLE IF NOT EXISTS coach (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, icon TEXT, behavlevel INTEGER, id_users INTEGER,  FOREIGN KEY (id_users) REFERENCES users ON DELETE CASCADE)", [])

          db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, age INTEGER, height REAL,  weight REAL, sex TEXT, UNIQUE(id,email))", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS plans  (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, notes TEXT, objective TEXT,  validstart TEXT, validend TEXT, id_users INTEGER, FOREIGN KEY (id_users) REFERENCES users ON DELETE CASCADE)", [])

          db.executeSql("CREATE TABLE IF NOT EXISTS questions  (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, subtitle TEXT, content TEXT, type TEXT, category TEXT, notes TEXT, objective TEXT, maxlevel TEXT, minlevel TEXT, scale INTEGER, validstart TEXT, validend TEXT, id_users INTEGER, FOREIGN KEY (id_users) REFERENCES users ON DELETE CASCADE)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS answers  (id INTEGER PRIMARY KEY AUTOINCREMENT, resptext TEXT,  respvalue TEXT, respint INTEGER, respbool TEXT, respnum REAL, resptime TEXT, resplocation TEXT, respactivity TEXT,  id_questions INTEGER, FOREIGN KEY (id_questions) REFERENCES questions ON DELETE CASCADE)", [])

          db.executeSql("CREATE TABLE IF NOT EXISTS activities_questions  (id_activities INTEGER, id_questions INTEGER, PRIMARY KEY (id_activities, id_questions), FOREIGN KEY (id_activities) REFERENCES activities ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (id_questions) REFERENCES questions ON DELETE CASCADE ON UPDATE NO ACTION)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS responses  (id INTEGER PRIMARY KEY AUTOINCREMENT, answer TEXT, level TEXT, rank TEXT, grade REAL, status TEXT, timestamp TEXT, id_questions INTEGER, FOREIGN KEY (id_questions) REFERENCES questions ON DELETE CASCADE ON UPDATE NO ACTION)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS contexts (id INTEGER PRIMARY KEY AUTOINCREMENT, place TEXT, latitude TEXT, longitude TEXT, timestamp TEXT, device TEXT, id_plans INTEGER, id_activities INTEGER, id_questions INTEGER, FOREIGN KEY (id_plans) REFERENCES plans ON DELETE CASCADE, FOREIGN KEY (id_activities) REFERENCES activities ON DELETE CASCADE, FOREIGN KEY (id_questions) REFERENCES questions ON DELETE CASCADE)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS sessions  (id INTEGER PRIMARY KEY AUTOINCREMENT,  type TEXT, objective TEXT, validstart TEXT, validend TEXT, id_users INTEGER, FOREIGN KEY (id_users) REFERENCES users ON DELETE CASCADE)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS activities  (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, objective TEXT, achievement REAL, precondition TEXT, postcondition TEXT, validstart TEXT, validend TEXT, energytotal REAL,  id_sessions INTEGER, FOREIGN KEY (id_sessions) REFERENCES sessions ON DELETE CASCADE)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS activities_plans  (id_activities INTEGER, id_plans INTEGER, PRIMARY KEY (id_activities, id_plans), FOREIGN KEY (id_activities) REFERENCES activities ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (id_plans) REFERENCES plans ON DELETE CASCADE ON UPDATE NO ACTION)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS emotions  (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, emotionclass TEXT, intensity REAL, timestamp TEXT)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS actions_emotions  (id_actions INTEGER, id_emotions INTEGER, PRIMARY KEY (id_actions, id_emotions), FOREIGN KEY (id_actions) REFERENCES actions ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (id_emotions) REFERENCES emotions ON DELETE CASCADE ON UPDATE NO ACTION)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS feelings  (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, feelingclass TEXT,  intensity REAL, timestamp TEXT)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS activities_feelings  (id_activities INTEGER, id_feelings INTEGER, PRIMARY KEY (id_activities, id_feelings), FOREIGN KEY (id_activities) REFERENCES activities ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (id_feelings) REFERENCES feelings ON DELETE CASCADE ON UPDATE NO ACTION)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS motivations  (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, need TEXT,  validstart TEXT, validend TEXT)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS activities_motivations  (id_activities INTEGER, id_motivations INTEGER, PRIMARY KEY (id_activities, id_motivations), FOREIGN KEY (id_activities) REFERENCES activities ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (id_motivations) REFERENCES motivations ON DELETE CASCADE ON UPDATE NO ACTION)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS actions  (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, performance REAL, precondition TEXT, postcondition TEXT, validstart TEXT, validend TEXT, id_activities INTEGER, FOREIGN KEY (id_activities) REFERENCES activities ON DELETE CASCADE)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS goals  (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, difficultylev REAL,  validstart TEXT, validend TEXT)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS actions_goals  (id_actions INTEGER, id_goals INTEGER, PRIMARY KEY (id_actions, id_goals), FOREIGN KEY (id_actions) REFERENCES actions ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (id_goals) REFERENCES goals ON DELETE CASCADE ON UPDATE NO ACTION)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS operations  (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, capacity REAL, precondition TEXT, postcondition TEXT, validstart TEXT, validend TEXT,  id_actions INTEGER, FOREIGN KEY (id_actions) REFERENCES actions ON DELETE CASCADE)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS measurements  (id INTEGER PRIMARY KEY AUTOINCREMENT, x REAL, y REAL, z REAL, speedx REAL, speedy REAL, speedz REAL, accelx  REAL, accely  REAL, accelz  REAL, timestamp TEXT, latitude TEXT, longitude TEXT, altitude REAL, energy REAL, id_operations INTEGER, FOREIGN KEY (id_operations) REFERENCES operations ON DELETE CASCADE)", [])
          db.executeSql("CREATE TABLE IF NOT EXISTS interactions  (id INTEGER PRIMARY KEY AUTOINCREMENT, uiobject TEXT, uiframe TEXT, uiartifact TEXT, timestamp TEXT,   id_operations INTEGER, FOREIGN KEY (id_operations) REFERENCES operations ON DELETE CASCADE)", [])

          this.isOpen = true;
          this.existsUser = false;
          this.existsDefault3Questions = false;
          this.idUser = 0;


        }).catch((error) => {
          console.log(error);
        })
    }
    console.log('Hello DatabaseProvider Provider');

    this.fullarraycoach = [];
    this.iconCOach = "";
  }


  /**
    GetAllActivities() {
      return new Promise((resolve, reject) => {
        this.db.executeSql("SELECT * FROM activities", []).then((data) => {
          let arrayactities = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              arrayactities.push({
                id: data.rows.item(i).id,
                name: data.rows.item(i).name,
                type: data.rows.item(i).type,
                objective: data.rows.item(i).objective,
                motive: data.rows.item(i).motive,
                precondition: data.rows.item(i).precondition,
                postcondition: data.rows.item(i).postcondition,
                validstart: data.rows.item(i).validstart,
                validend: data.rows.item(i).validend,
                energytotal: data.rows.item(i).energytotal,
                id_users: data.rows.item(i).id_users
              });
            }
          }
          resolve(arrayactities);
        }, (error) => {
          reject(error);
        })
      })
    }
   
  
   */


  //FUNCTIONS

  //          db.executeSql("CREATE TABLE IF NOT EXISTS coach (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, icon TEXT, behavlevel INTEGER)", [])
  CreateNewCoach(name: string, description: string, icon: string, behavlevel: number) {
    let sqlquery = 'INSERT OR IGNORE INTO COACH (name, description, icon, behavlevel, id_users) VALUES (?, ?, ?, ?, ?)';
    console.log('\t \t TEST CreateStandCoach')
    this.storage.create({
      name: 'activitydata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(sqlquery, [name, description, icon, behavlevel, this.idUser])
          .then((dataret) => {
            console.log('successful Executed SQL COACH cration:', dataret);
            // if (dataret.rows.length > 0) {

            //   this.idCOach = dataret.rows.item(0).id;
            // }
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  GetAllCoaches() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM coach", []).then((data) => {
        let arraycoach = [];
        console.log('this is coadata', data);
        if (data.rows.length > 0) {
          console.log('database.ts length data:');
          console.log(data.rows.length);
          for (var i = 0; i < data.rows.length; i++) {
            arraycoach.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              icon: data.rows.item(i).icon,
              description: data.rows.item(i).description,
              behavlevel: data.rows.item(i).behavlevel
            });
          }
          console.log('arraycoach:', arraycoach);

        }
        resolve(arraycoach);
      }, (error) => {
        reject(error);
      })
    })
  }




  GetFileNameCoach() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM coach", []).then((data) => {
        // let arraycoach = [];
        let filename = "";
        console.log('this is coadata', data);
        if (data.rows.length > 0) {
          filename = data.rows.item(0).icon;
          // for (var i = 0; i < data.rows.length; i++) {
          //   arraycoach.push({
          //     id: data.rows.item(i).id,
          //     name: data.rows.item(i).name,
          //     icon: data.rows.item(i).icon,
          //     description: data.rows.item(i).description,
          //     behavlevel: data.rows.item(i).behavlevel
          //   });
          // }
          console.log('filename >>:', filename);

        }
        resolve(filename);
      }, (error) => {
        reject(error);
      })
    })
  }



  GetCurrentCoach() {

    let arraycoach = [];

    let sqlquery = "SELECT * FROM COACH";
    this.storage.create({
      name: 'activitydata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(sqlquery, [])
          .then((dataret) => {
            console.log('ALL COACH Executed SQL length:', dataret.rows.length);
            // let arraycoach = [];
            if (dataret.rows.length > 0) {
              for (var i = 0; i < dataret.rows.length; i++) {
                this.idCOach = dataret.rows.item(0).id;
                this.iconCOach = dataret.rows.item(i).icon;
                console.log('idCOach', this.idCOach);
                console.log('iconCOach', this.iconCOach);
                arraycoach.push({
                  id: dataret.rows.item(i).id,
                  name: dataret.rows.item(i).name,
                  icon: dataret.rows.item(i).icon,
                  description: dataret.rows.item(i).description,
                  behavlevel: dataret.rows.item(i).behavlevel
                });
                console.log('arraycoach:', arraycoach);
              }
              this.fullarraycoach = arraycoach;
            }
            console.log('COACH ARRAY SQL:', arraycoach);
            //this.fullarraycoach = arraycoach;
            console.log('COACH ARRAY SQL XX:', this.fullarraycoach);
            /*
                        if(dataret.rows.length>0) {
                          console.log('THE USER EXISTS Executed SQL:', dataret);
                          tempusername = dataret.rows.item(0).name;
                          console.log('tempusername:', tempusername);
                        }
            */
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
    console.log('ANTES RETURN COACH ARRAY SQL:', arraycoach);
    //this.fullarraycoach = arraycoach;

    coachdata = arraycoach;
    console.log('DECLARE COACHDA:', coachdata);
    /*
    return new Promise(function(resolve, reject) {
      resolve(
        console.log('resolve')
        
      );
      reject(console.log('reject'));
    });
    */
    //return arraycoach;

  }



  /*
    addStandardCoaches(){
      this.CreateNewCoach("Totoro", "<p>It is friendly but... </p><p>it prefers no to be disturbed</p>","c1.png",1);
      this.CreateNewCoach("Mimiko", " <p>It will remind you only  important things </p><p>... it dismisses for you the rest </p>","c2.png",2);
      this.CreateNewCoach("Haku", "<p>It keeps a balance between</p>    <p> important and secondary tasks </p>","c3.png",3);
      this.CreateNewCoach("Chihiro", "<p>A little bit stubborn, </p><p>always trying the best for you</p>","c4.png",4);
      this.CreateNewCoach("Roboto", "<p>It likes plans and things done</p><p>It will remind you how to achieve goals</p>","c5.png",5);
    }
  */



  //   CREMENT, name TEXT,   email TEXT,    age INTEGER, height REAL,  weight REAL, sex TEXT)", [])
  CreateNewUser(name: string, email: string, age: number, height: number, weight: number, sex: string) {
    // let sqlquery = 'INSERT INTO USERS (name, email, age, height, weight, sex) VALUES (?, ?, ?, ?, ?, ?)';
    let sqlquery = 'INSERT OR IGNORE INTO USERS (name, email, age, height, weight, sex) VALUES (?, ?, ?, ?, ?, ?)';
    console.log('\t \t TEST CreateNewUser')
    this.storage.create({
      name: 'activitydata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(sqlquery, [name, email, age, height, weight, sex])
          .then((dataret) => {
            console.log('successful Executed SQL:', dataret);
            if (dataret.rows.length > 0) {
              this.idUser = dataret.rows.item(0).id;
            }
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  /**
   * 
   * @param title 
   * @param subtitle 
   * @param content 
   * @param type input, range, check
   * @param category nu, morgon, kväll
   * @param notes 
   * @param objective 
   * @param maxlevel
   * @param minlevel
   * @param scale
   * @param validstart 
   * @param validend 
   * @param id_users 
   */
  CreateNewQuestionnaire(title: string, subtitle: string, content: string, type: string, category: string, notes: string, objective: string, maxlevel: string, minlevel: string, scale: number, validstart: string, validend: string, id_users: number) {
    // title TEXT, subtitle TEXT, content TEXT, type TEXT, category TEXT, notes TEXT, objective TEXT,  validstart TEXT, validend TEXT, id_users INTEGER, FOREIGN KEY (id_users)
    // objective TEXT, maxlevel TEXT, minlevel TEXT, scale INTEGER, validstart TEXT,
    let sqlquery = 'INSERT OR IGNORE INTO QUESTIONS (title, subtitle, content, type, category, notes, maxlevel, minlevel, scale, objective, validstart, validend, id_users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    this.storage.create({
      name: 'activitydata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(sqlquery, [title, subtitle, content, type, category, notes, objective, maxlevel, minlevel, scale, validstart, validend, id_users])
          .then((dataset) => {
            console.log('successful Executed SQL in QUESTIONS:', dataset);
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }


  InsertAnswer(resptext: string, respvalue: string, respint: number, respbool: string, respnum: number, resptime: string, resplocation: string, respactivity: string, id_questions: number) {
    //let sqlquery = 'INSERT OR IGNORE INTO ANSWERS (resptext, respvalue, respint, respbool, respnum, resptime, resplocation, respactivty, id_questions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let sqlquery = "INSERT INTO ANSWERS (resptext, respvalue, respint, respbool, respnum, resptime, resplocation, respactivity, id_questions)     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    this.storage.create({
      name: 'activitydata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(sqlquery, [resptext, respvalue, respint, respbool, respnum, resptime, resplocation, respactivity, id_questions])
          .then((dataset) => {
            console.log('successful Executed SQL in ANSWERS:', dataset);
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }



  AddNewAnswer(resptext: string, respvalue: string, respint: number, respbool: string, respnum: number, resptime: string, resplocation: string, respactivity: string, notes:string) {
    let idtest =0;
    let isDone: number = 0;
    let sqlquery = "SELECT id FROM questions WHERE notes = '"+notes+"' ";
    this.storage.create({
      name: 'activitydata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(sqlquery, [])
          .then((dataset) => {
            console.log(dataset.rows.length);
            let arrayusers = [];
            if (dataset.rows.length > 0) {
              this.testidquest = dataset.rows.item(0).id;
              // idtest  = dataset.rows.item(0).id;
              console.log('____ IDQUEST;:',this.testidquest);
              idtest = this.testidquest;
              isDone = this.testidquest;
              console.log('- - - - > isdon:',isDone);

            }

   this.InsertAnswer(resptext, respvalue, respint, respbool, respnum, resptime, resplocation, respactivity,isDone);


          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));

    this.GetAllAnswers();
  }


  //let sqlquery = 'INSERT OR IGNORE INTO ANSWERS (resptext, respvalue, respint, respbool, respnum, resptime, resplocation, respactivty, id_questions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  GetAllAnswers() {
    let arrayusers = [];
     
    let sqlquery = "SELECT * FROM answers";
    this.storage.create({
      name: 'activitydata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(sqlquery, [])
          .then((dataset) => {
            console.log('successful Executed SQL SELECT ALL ANSWERS', dataset);
            console.log(' select * answers -> NUM OF ROWS: ',dataset.rows.length);
            if (dataset.rows.length > 0) {
              for (var i = 0; i < dataset.rows.length; i++) {
                arrayusers.push({
                  id: dataset.rows.item(i).id,
                  resptext: dataset.rows.item(i).resptext,
                  respvalue: dataset.rows.item(i).respvalue,
                  respint: dataset.rows.item(i).respint,
                  id_questions: dataset.rows.item(i).id_questions
                });
              }             
            }

            console.log('ANSWERS * ARRAY SQL:', arrayusers);

          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));

      return arrayusers;

  }





  GetCurrentUser() {
    let sqlquery = "SELECT * FROM USERS WHERE email LIKE '%default@user.se%'";
    //let sqlquery = "SELECT * FROM USERS";
    var tempusername: string;
    tempusername = "";
    console.log(tempusername)
    this.storage.create({
      name: 'activitydata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(sqlquery, [])
          .then((dataret) => {
            console.log('ALL USERS Executed SQL length:', dataret.rows.length);
            let arrayusers = [];
            if (dataret.rows.length > 0) {
              //this.idUser = dataret.rows.item(i).id;
              this.existsUser = true;
              for (var i = 0; i < dataret.rows.length; i++) {
                this.idUser = dataret.rows.item(0).id;
                arrayusers.push({
                  id: dataret.rows.item(i).id,
                  name: dataret.rows.item(i).name,
                  email: dataret.rows.item(i).email,
                  age: dataret.rows.item(i).age,
                  height: dataret.rows.item(i).height,
                  weight: dataret.rows.item(i).weight,
                  sex: dataret.rows.item(i).sex
                });
              }
            }
            console.log('USERS ARRAY SQL:', arrayusers);
            /*
                        if(dataret.rows.length>0) {
                          console.log('THE USER EXISTS Executed SQL:', dataret);
                          tempusername = dataret.rows.item(0).name;
                          console.log('tempusername:', tempusername);
                        }
            */
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }


  GetCurrentQuestions() {
    let sqlquery = "SELECT * FROM QUESTIONS";
    this.storage.create({
      name: 'activitydata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(sqlquery, [])
          .then((dataret) => {
            let arrayquestions = [];
            if (dataret.rows.length > 0) {
              this.existsDefault3Questions = true;
              for (var i = 0; i < dataret.rows.length; i++) {
                arrayquestions.push({
                  id: dataret.rows.item(i).id,
                  title: dataret.rows.item(i).title,
                  subtitle: dataret.rows.item(i).subtitle,
                  content: dataret.rows.item(i).content,
                  type: dataret.rows.item(i).type,
                  category: dataret.rows.item(i).category,
                  notes: dataret.rows.item(i).notes,
                  objective: dataret.rows.item(i).objective,
                  validstart: dataret.rows.item(i).validstart,
                  validend: dataret.rows.item(i).validend,
                  id_users: dataret.rows.item(i).id_users
                });
              }
            }
            console.log('QUESTIONS ARRAY SQL:', arrayquestions);
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  DeleteUsersInformation() {
    let sqlquery = "DELETE FROM USERS";
    this.storage.create({
      name: 'activitydata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(sqlquery, [])
          .then((dataret) => {
            console.log('ALL USERS DELETED SQL:', dataret);
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }


  /**
   * Adds a new questionnaire 
   * @param title 
   * @param subtitle 
   * @param content 
   * @param type 
   * @param category 
   * @param notes 
   * @param objective 
   * @param validstart 
   * @param validend 
   * @param id_users 
   */
  AddNewQuestionnaire(title: string, subtitle: string, content: string, type: string, category: string, notes: string, objective: string, validstart: string, validend: string, id_users: number) {
    let sqlquery = 'INSERT INTO QUESTIONS (title, subtitle, content, type, category, notes, objective, validstart, validend, id_users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    this.storage.create({
      name: 'activitydata.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql(sqlquery, [title, subtitle, content, type, category, notes, objective, validstart, validend, id_users])
          .then((dataret) => console.log('successful Executed SQL:', dataret))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }




  //                          type TEXT, objective TEXT, validstart TEXT, validend TEXT, id_users INTEGER, FOREIGN KEY (id_users) REFERENCES users ON DELETE CASCADE)", [])
  CreateSession(type: string, objective: string, validstart: string, validend: string, id_users: number) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO sessions (type, objective, validstart, validend, id_users) VALUES (?, ?, ?, ?, ?)";
      this.db.executeSql(sql, [type, objective, validstart, validend, id_users]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
  /*
    CreateEvent(title: string, location: string, notes: string, startDate: string, endDate: string, id_users: number) {
      return new Promise((resolve, reject) => {
        let sql = "INSERT INTO events (title, location, notes, startDate, endDate, id_users) VALUES (?, ?, ?, ?, ?, ?)";
        this.db.executeSql(sql, [title, location, notes, startDate, endDate, id_users]).then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
      });
    }
  */

  CreatePlan(name: string, type: string, notes: string, objective: string, validstart: string, validend: string, id_users: number) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO plans (name, type, notes, objective, validstart, validend, id_users) VALUES (?, ?, ?, ?, ?, ?, ?)";
      this.db.executeSql(sql, [name, type, notes, objective, validstart, validend, id_users]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  /*
    AddSessionsPlans(id_sessions: number, id_plans: number) {
      return new Promise((resolve, reject) => {
        let sql = "INSERT INTO sessions_plans (id_sessions, id_plans) VALUES (?, ?)";
        this.db.executeSql(sql, [id_sessions, id_plans]).then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
      });
    }
  */






  //       db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, age INTEGER, height REAL,  weight REAL, sex TEXT)", [])
  CreateUser(name: string, email: string, age: number, height: number, weight: number, sex: string) {
    console.log('inside CreateUser- values:', email);
    return new Promise((resolve, reject) => {
      let sql = 'INSERT INTO users (name, email, age, height, weight, sex) VALUES (?, ?, ?, ?, ?, ?)';
      this.db.executeSql(sql, [name, email, age, height, weight, sex]).then((data) => {
        console.log('before resolve :' + data);
        resolve(data);
        console.log('data in resolve:' + data);
      }, (error) => {
        console.log('before reject:' + error);
        reject(error);
        console.log('error in reject:' + error);
      });
    });
  }

  AddEmotion(name: string, type: string, emotionclass: string, timestamp: string, id_sessions: number) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO emotions (name, type, emotionclass, timestamp, id_sessions) VALUES ( ?, ?, ?, ?, ?)";
      this.db.executeSql(sql, [name, type, emotionclass, timestamp, id_sessions]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  AddMotive(name: string, type: string, need: string, validstart: string, validend: string) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO activities (name, type, need, validstart, validend) VALUES ( ?, ?, ?, ?, ?)";
      this.db.executeSql(sql, [name, type, need, validstart, validend]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }





  //, name TEXT, type TEXT, objective TEXT, achievement REAL, precondition TEXT, postcondition TEXT, validstart TEXT, validend TEXT, energytotal REAL,  id_sessions INTEGER, FOREIGN KEY (id_sessions) REFERENCES sessions ON DELETE CASCADE)", [])

  AddActivity(name: string, type: string, objective: string, achievement: number, precondition: string, postcondition: string, validstart: string, validend: string, energytotal: number, id_sessions: number) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO activities (name, type, objective, achievement, precondition, postcondition, validstart, validend, energytotal, id_sessions) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      this.db.executeSql(sql, [name, type, objective, achievement, precondition, postcondition, validstart, validend, energytotal, id_sessions]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  // name TEXT, type TEXT, objective TEXT, achievement REAL, precondition TEXT, postcondition TEXT, validstart TEXT, validend TEXT, energytotal REAL,  id_sessions INTEGER, FOREIGN KEY (id_sessions) REFERENCES sessions ON DELETE CASCADE)", [])
  CheckDefaultActivities() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM activities WHERE name = 'running'", []).then((data) => {
        let arraysessions = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            if (data.rows.item(i).name == 'running') {
              alert('yes');
            } else {
              alert('no');
            }

            // arraysessions.push({
            //   id: data.rows.item(i).id,
            //   type: data.rows.item(i).type,
            //   objective: data.rows.item(i).objective,
            //   validstart: data.rows.item(i).validstart,
            //   validend: data.rows.item(i).validend,
            //   id_users: data.rows.item(i).id_us
            // });

          }
        }
        resolve(arraysessions);
      }, (error) => {
        reject(error);
      })
    })
  }


  GetAllSessions() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM sessions", []).then((data) => {
        let arraysessions = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arraysessions.push({
              id: data.rows.item(i).id,
              type: data.rows.item(i).type,
              objective: data.rows.item(i).objective,
              validstart: data.rows.item(i).validstart,
              validend: data.rows.item(i).validend,
              id_users: data.rows.item(i).id_us
            });
          }
        }
        resolve(arraysessions);
      }, (error) => {
        reject(error);
      })
    })
  }

  GetAllPlans() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM plans", []).then((data) => {
        let arrayplans = [];
        console.log('this is data', data);
        if (data.rows.length > 0) {
          console.log('database.ts length data:');
          console.log(data.rows.length);
          for (var i = 0; i < data.rows.length; i++) {
            arrayplans.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              type: data.rows.item(i).type,
              notes: data.rows.item(i).notes,
              objective: data.rows.item(i).objective,
              validstart: data.rows.item(i).validstart,
              validend: data.rows.item(i).validend,
              id_users: data.rows.item(i).id_us
            });
            //this.ListPlans.push({ name: data.rows.item(i).name});
          }
        }
        resolve(arrayplans);
      }, (error) => {
        reject(error);
      })
    })
  }


  /*
   GetAllEvents() {
     return new Promise((resolve, reject) => {
       this.db.executeSql("SELECT * FROM events", []).then((data) => {
         let arrayevents = [];
         if (data.rows.length > 0) {
           console.log('database.ts length data:');
           console.log(data.rows.length);
           console.log(data);
           for (var i = 0; i < data.rows.length; i++) {
             arrayevents.push({
               title: data.rows.item(i).title,
               location: data.rows.item(i).location,
               notes: data.rows.item(i).notes,
               startDate: data.rows.item(i).startDate,
               endDate: data.rows.item(i).endDate
             });
             //this.ListPlans.push({ name: data.rows.item(i).name});
           }
         }
         resolve(arrayevents);
       }, (error) => {
         reject(error);
       })
     })
   }
 */



  GetAllUsers() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM users", []).then((data) => {
        let arrayusers = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayusers.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              email: data.rows.item(i).email,
              age: data.rows.item(i).age,
              height: data.rows.item(i).height,
              weight: data.rows.item(i).weight,
              sex: data.rows.item(i).sex
            });
          }
        }
        resolve(arrayusers);
        console.log('GetAllUsers' + data.rows.length);
        console.log(data.rows.length);
      }, (error) => {
        reject(error);
      })
    })
  }


  GetAllActivities() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM activities", []).then((data) => {
        let arrayactities = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayactities.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              type: data.rows.item(i).type,
              objective: data.rows.item(i).objective,
              motive: data.rows.item(i).motive,
              precondition: data.rows.item(i).precondition,
              postcondition: data.rows.item(i).postcondition,
              validstart: data.rows.item(i).validstart,
              validend: data.rows.item(i).validend,
              energytotal: data.rows.item(i).energytotal,
              id_users: data.rows.item(i).id_users
            });
          }
        }
        resolve(arrayactities);
      }, (error) => {
        reject(error);
      })
    })
  }




}
