"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const ReporterLog = (0, debug_1.default)("app:Reporter :");
const finishedround = (0, debug_1.default)("app:finished Weightlifter :");
const Targettable = (0, debug_1.default)("app:TargetTable :");
const Target = (0, debug_1.default)("app:Target :");
const Renewedround = (0, debug_1.default)("app:Renewedround :");
const Ranking = (0, debug_1.default)("app:Ranking :");
const FinalRanking = (0, debug_1.default)("app:FinalRanking :");
class Weightlifter {
    constructor(name, Nationality) {
        this.name = "";
        this.power = 0;
        this.Nationality = "";
        this.age = 0;
        this.name = name;
        this.log = (0, debug_1.default)(`app:Weightlifter:${this.name}`);
        this.Nationality = Nationality;
        this.age = Math.floor(Math.random() * 20 + 15);
        this.Target = [Math.floor(Math.random() * 50 + 150), Math.floor(Math.random() * 50 + 150), Math.floor(Math.random() * 50 + 150)];
        this.resultTarget = [];
        this.Success = [true, true, true];
        this.recored = 0;
        this.round = 1;
    }
    roundPLUS(fromWho) {
        this.round++;
    }
}
function sleep(sleepTime) {
    (function () {
        var now = new Date().getTime();
        while (new Date().getTime() < now + sleepTime)
            ;
    })();
}
function sortbytarget(Weightlifters) {
    for (var i = 0; i < Weightlifters.length; i++) {
        for (var j = i + 1; j < Weightlifters.length; j++) {
            if (Weightlifters[i].Target[Weightlifters[i].round - 1] > Weightlifters[j].Target[Weightlifters[j].round - 1]) {
                var c = Weightlifters[j];
                Weightlifters[j] = Weightlifters[i];
                Weightlifters[i] = c;
            }
        }
    }
}
function setSuccesANDrecored(item) {
    var counter = 0;
    item.resultTarget[item.round - 1].forEach(item => {
        if (item == "RED") {
            counter++;
        }
    });
    if (counter > 1) {
        item.Success[item.round - 1] = false;
    }
    else {
        item.Success[item.round - 1] = true;
        item.recored = item.Target[item.round - 1];
    }
}
function initialTarget(Weightlifters) {
    Weightlifters.forEach((item) => {
        item.roundPLUS(item);
        while (item.Target[item.round - 1] < item.recored) {
            item.Target[item.round - 1] = Math.floor(Math.random() * 50 + 150);
        }
    });
}
function sortbyrecord(Weightlifters) {
    for (var i = 0; i < Weightlifters.length; i++) {
        for (var j = i + 1; j < Weightlifters.length; j++) {
            if (Weightlifters[i].recored < Weightlifters[j].recored) {
                var c = Weightlifters[j];
                Weightlifters[j] = Weightlifters[i];
                Weightlifters[i] = c;
            }
        }
    }
}
function sortbyround(Weightlifters) {
    for (var i = 0; i < Weightlifters.length; i++) {
        for (var j = i + 1; j < Weightlifters.length; j++) {
            if (Weightlifters[i].round < Weightlifters[j].round) {
                var c = Weightlifters[j];
                Weightlifters[j] = Weightlifters[i];
                Weightlifters[i] = c;
            }
        }
    }
}
function countroundthree(Weightlifters) {
    var counter = 0;
    Weightlifters.forEach(item => {
        if (item.round == 3) {
            counter++;
        }
    });
    return counter;
}
function endedANDindexItmRndBgrthanthree(item, exitcopmlex) {
    if (item.round > 2) {
        finishedround(`${item.name} ended its work`);
        exitcopmlex.push(item);
        sleep(2000);
    }
}
function SpliceItmRndBgrthanthree(Weightlifters) {
    sortbyround(Weightlifters);
    Weightlifters.splice(0, countroundthree(Weightlifters));
}
function startWeightliftingGame(timeout = 3) {
    return __awaiter(this, void 0, void 0, function* () {
        ReporterLog("Weightlifting is going to be started... ");
        const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            ReporterLog(`In ${timeout--}`);
            if (timeout < 0) {
                clearInterval(interval);
                ReporterLog("Started !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
                const Weightlifter1 = new Weightlifter("Weightlifter1", "IRAN");
                const Weightlifter2 = new Weightlifter("Weightlifter2", "IRAQ");
                const Weightlifter3 = new Weightlifter("Weightlifter3", "Poland");
                const Weightlifter4 = new Weightlifter("Weightlifter4", "Lithuania");
                const Weightlifter5 = new Weightlifter("Weightlifter5", "Georgia");
                ReporterLog("Ladies and gentlemen, we introduce the weightlifters participating in this competition:");
                sleep(2000);
                var Weightlifters = [Weightlifter1, Weightlifter2, Weightlifter3, Weightlifter4, Weightlifter5];
                Weightlifters.forEach((item) => {
                    ReporterLog(`${item.name} from ${item.Nationality} & his age ${item.age}`);
                    sleep(2000);
                });
                sleep(2000);
                var iteration = 0;
                var exitcopmlex = [];
                var totalranking = [];
                while (Weightlifters.length > 0) {
                    if (iteration == 0) {
                        sortbytarget(Weightlifters);
                    }
                    else if (iteration != 0) {
                        initialTarget(Weightlifters);
                        sortbytarget(Weightlifters);
                    }
                    ReporterLog('Weightlifters, with the help of their coaches, target new weights :');
                    Weightlifters.forEach((item) => {
                        Targettable(`${item.name} from ${item.Nationality} & Target: ${item.Target[item.round - 1]} kg`);
                        sleep(2000);
                    });
                    Weightlifters.forEach((item) => {
                        ReporterLog(`${item.name} is preparing to lift ${item.Target[item.round - 1]} kg`);
                        sleep(2000);
                        var TargetRandom = [["RED", "RED", "RED"], ["RED", "White", "White"], ["White", "White", "White"]];
                        item.resultTarget[item.round - 1] = TargetRandom[Math.floor(Math.random() * TargetRandom.length)];
                        Target(`${item.name} Target & result is ${item.resultTarget[item.round - 1].join(" ")} `);
                        setSuccesANDrecored(item);
                        endedANDindexItmRndBgrthanthree(item, exitcopmlex);
                        sleep(2000);
                        while (item.Success[item.round - 1] == false && item.round < 3) {
                            item.roundPLUS(item);
                            item.Target[item.round - 1] = item.Target[item.round - 2];
                            item.resultTarget[item.round - 1] = TargetRandom[Math.floor(Math.random() * TargetRandom.length)];
                            Renewedround(`${item.name} Target in round ${item.round} & result is ${item.resultTarget[item.round - 1].join(" ")} `);
                            sleep(2000);
                            setSuccesANDrecored(item);
                            endedANDindexItmRndBgrthanthree(item, exitcopmlex);
                        }
                    });
                    SpliceItmRndBgrthanthree(Weightlifters);
                    totalranking = Weightlifters.concat(exitcopmlex);
                    sortbyrecord(totalranking);
                    ReporterLog("Weightlifting rankings so far:");
                    var i = 1;
                    totalranking.forEach((item) => {
                        Ranking(`${i}: ${item.name} from ${item.Nationality}  ${item.resultTarget.join(" / ")}  Record ${item.recored} ,Has played ${item.round} rounds. ${3 - item.round} chance left.`);
                        i++;
                        sleep(2000);
                    });
                    iteration++;
                }
                ReporterLog("Game is finished & final Ranking is:");
                var i = 1;
                totalranking.forEach((item) => {
                    FinalRanking(` ${i}: ${item.name}  Targets: ${item.Target[0]}=>${item.Success[0]} , ${item.Target[1]}=>${item.Success[1]} , ${item.Target[2]}=>${item.Success[2]}   Recored: ${item.recored}`);
                    i++;
                });
            }
        }), 1500);
    });
}
startWeightliftingGame();
