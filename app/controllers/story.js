import Ember from 'ember';

const {
  Controller,
  observer,
  computed,
  run: {
    bind
  }
} = Ember;

export default Controller.extend({
  activeObjects: [],

  jsonChapters: [{"date":"2015, 06, 20","title":"Neue Heimat","location":"Sønderborg","lat":54.913811,"lng":9.792178,"accuracy":2,"action":"","feelings":"","type":"Video","description":"Rami ist seit vier Wochen in Dänemark. Bei der Asylbewerberunterkunft in Sønderborg handelt es sich um eine ehemalige Kaserne. Rami teilt sich mit fünf anderen Syrern ein Zimmer. Vom Fenster aus kann er das Meer sehen. Er hat einen Dänischkurs angefangen und notiert in seinem Notizheft akribisch die Aussprache der Vokabeln in arabischer Lautschrift. Alles wirkt noch fremd und neu, aber langsam beginnt er sich an seine neue Heimat zu gewöhnen. Im Keller der Kaserne ist ein Fitnessraum eingerichtet. Regelmäßig trainieren Rami und die anderen Syrer dort. Sie wollen sich ein Stück Normalität erkämpfen, Menschlichkeit zurückholen, die sie auf der Flucht verloren haben. Es ist Ramadan, der Fastenmonat der Muslime. Einige Syrer haben sich Angeln gekauft und fischen Kabeljau, den sie nach Einbruch der Dunkelheit in der gemeinsamen Küche zubereiten. Rami genießt es, in der Stadt zu spazieren. Er schlendert auf einen Steg zu. Hierhin kommt er beinahe täglich, seit seine Flucht beendet ist. Eine Flucht, die über fünf Monate dauerte, in denen er 4000 Kilometer zurücklegte und acht Grenzen überwand."},
{"date":"2015, 05, 23","title":"Kein Zurück","location":"Kopenhagen","lat":55.676097,"lng":12.568337,"accuracy":2,"action":"","feelings":"","type":"Text","description":"Rami war schon bei seiner Schwester, als er von einer Polizeistreife im Zug nach seinen Papieren gefragt wird. Für einen kurzen Moment überlegt er, ob er fliehen soll. Aber er hat keine Chance. Die Beamten bringen ihn zu einer Polizeistation. Dort warten bereits Mitarbeiter des Roten Kreuzes, um Rami bei den anstehenden Schritten zu unterstützen:  Denn ihm bleibt nur noch die Möglichkeit, jetzt in Dänemark Asyl zu beantragen. Nach Deutschland kann er nicht mehr zurück. Rami wird nach Sønderborg nahe der dänisch-deutschen Grenze gebracht, in eine Einrichtung für syrische Asylsuchende. Aktuell leben hier 300 Flüchtlinge aus Syrien, die in der Regel nach einigen Tagen einen Ausweis bekommen, mit dem sie sich frei im Land bewegen dürfen. Auch Sprachkurse und weitere Angebote stehen den Syrern dort zur Verfügung. Seine Festnahme in Dänemark erscheint Rami nicht mehr als Niederlage - im Gegenteil: Er wirkt erleichtert, dass seine Flucht nun endlich beendet ist und er in der Nähe seiner Schwester bleiben kann."},
{"date":"2015, 05, 22","title":"Zur Schwester nach Dänemark","location":"Hamburg","lat":53.551085,"lng":9.993682,"accuracy":2,"action":"Auto","feelings":"zweifel","type":"Text","description":"Rami übernachtet in Hamburg bei seinem Bekannten. Eigentlich wollte er heute Asyl beantragen, doch dann bietet ihm ein anderer syrischer Bekannter an, ihn mit nach Dänemark zu nehmen. In Kopenhagen lebt Ramis Schwester. Er hat sie seit über drei Jahren nicht gesehen. Rami beginnt an seinem ursprünglichen Plan zu zweifeln: Wenn er jetzt in Deutschland Asyl beantragt, dann könnte er seine Schwester lange nicht sehen. Er müsste die ersten Monate im Auffanglager in Hamburg-Harburg bleiben und dürfte Deutschland nicht verlassen, bis das Verfahren abgeschlossen ist. Das dauert manchmal über ein Jahr. Rami entscheidet sich für den Besuch seiner Schwester. Mit dem Auto bringt ihn der Bekannte nach Dänemark."},
{"date":"2015, 05, 21","title":"Mit dem Zug nach Hamburg","location":"München Hauptbahnhof","lat":48.140350,"lng":11.557768,"accuracy":3,"action":"zug","feelings":"","type":"Text","description":"Rami steigt in München am Hauptbahnhof in den Zug. Er will nach Hamburg, denn dort kann er vorübergehend bei einem Bekannten aus Syrien unterkommen. Dann will er Asyl beantragen."},
{"date":"2015, 05, 21","title":"Es ist geschafft ","location":"München","lat":48.135125,"lng":11.581981,"accuracy":2,"action":"warten","feelings":"glücklich","type":"Text","description":"München! Rami wirkt überglücklich. Doch noch ist seine Reise nicht vorbei. Eigentlich wollte er mit dem Nachtzug gleich weiter nach Hamburg. Doch am Hauptbahnhof muss er feststellen, dass keine Züge fahren - Lokführerstreik. Völlig erschöpft lässt er sich in einer ruhigen Ecke eines 24-Stunden-Restaurants nieder, um die Nacht durchzumachen. In seiner Hand hält er das Ticket für den Frühzug. Ziel: Hamburg."},
{"date":"2015, 05, 20","title":"Über die Grenze","location":"München","lat":48.135125,"lng":11.581981,"accuracy":2,"action":"auto","feelings":"erleichterung","type":"Video","description":"Fünf Kilometer vor der Grenze hält der Fahrer des Opels auf einer Raststätte an. Es ist 21:30 Uhr. Rami weiß in diesem Moment nicht, ob er bereits in Deutschland ist. Er steigt aus, um für alle im Auto Getränke zu kaufen. Als die Gruppe weiterfahren will, steht kurz vor der Auffahrt zur Autobahn ein Streifenwagen. Der Polizist signalisiert dem Fahrer des Opels abzubremsen. Zwei Beamte der Bundespolizei leuchten mit Taschenlampen ins Innere des Wagens, kontrollieren die Gesichter der Fahrgäste. Dann winken sie den Opel durch. Wenige Minuten später überqueren sie die Grenze."},
{"date":"2015, 05, 20","title":"Eine Falle?","location":"Wien Ostbahnhof","lat":48.183889,"lng":16.383217,"accuracy":3,"action":"auto","feelings":"angst","type":"Text","description":"Pünktlich um 18:00 Uhr steht er am Wiener Ostbahnhof am vereinbarten Treffpunkt. Seine Mitfahrer scheinen sich zu verspäten. Rami hat ihnen nichts von seiner Flucht erzählt, er hatte sich im Internet als ägyptischer Tourist ausgegeben. Rami geht in den Bahnhof, um noch schnell Wasser für die bevorstehende Fahrt zu kaufen. Als er gerade im Laden steht, hält ein Polizeiwagen vor dem Gebäude. Reflexartig taucht er in der Masse der Menschen unter. <br>&quote; Ich hatte Angst, dass es eine Falle war und die Polizei gezielt die Mitfahrgelegenheiten kontrolliert&quot;, sagt Rami. <br>Und wieder hat er Glück. Die Polizisten ziehen nach einer Viertelstunde ab. Kurz darauf taucht der Opel Kadett auf, der ihn mit nach Deutschland nehmen soll. Um 18:16 Uhr steigt er in den Wagen und verlässt Wien."},
{"date":"2015, 05, 20","title":"Mitfahrgelegenheit nach München","location":"In der Nähe von Wien","lat":48.208174,"lng":16.373819,"accuracy":1,"action":"","feelings":"motiviert","type":"Text","description":"Nach kurzer Verschnaufpause hält es Rami nicht länger aus. Er will die letzte Grenze zwischen ihm und seinem großen  Ziel - Deutschland - endlich überwinden. Ein Schleuser bietet ihm an, ihn für 600 Euro nach Deutschland zu bringen, doch lehnt ab. Sein Freund hat ihm erzählt, dass die Polizei normale PKWs seltener kontrolliert als größere Transporter, die häufig von Schleusern genutzt werden. Im Internet sucht er sich deshalb eine Mitfahrgelegenheit nach München."},
{"date":"2015, 05, 19","title":"Der Unterschlupf","location":"In der Nähe von Wien","lat":48.208174,"lng":16.373819,"accuracy":1,"action":"pause","feelings":"entspannung","type":"Image","description":"Ramis Bekannter wohnt in einem Vorort von Wien. Er möchte nicht erkannt werden. Als Rami ihn vor ein paar Tagen kontaktiert hat, da hat er ihm sofort seine Hilfe angeboten Für Rami ist die Wohnung das erste „sichere&quot; Versteck seit langer Zeit. Für ein paar Stunden kann er die Angst und die Strapazen der Flucht vergessen."},
{"date":"2015, 05, 18","title":"10km vor Wien","location":"In der Nähe von Wien","lat":48.208174,"lng":16.373819,"accuracy":1,"action":"Van","feelings":"erschöpft","type":"Text","description":"Die Grenze zu Österreich passieren Rami und die anderen Flüchtlinge im Van ohne Probleme. Kurz bevor sie die österreichische Hauptstadt erreichen, klopft der Fahrer an das Fenster zur Ladefläche. &quot;In fünf Minuten muss ich euch rauswerfen, macht euch bereit!&quot; Rami zieht sein letztes noch sauberes Jackett an, um auf der Straße nicht aufzufallen. Als das Auto stoppt und die Gruppe von der Ladefläche springt, hält Rami ein vorbeifahrendes Taxi an. Und wieder scheint er unglaubliches Glück zu haben: <br>&quot;Im Rückspiegel sehe ich, wie ein Polizeiauto neben dem Van stoppt. Später habe ich erfahren, dass die ganze Gruppe verhaftet wurde&quot;, sagt er. Dem Taxifahrer gibt Rami die Adresse seines Bekannten. Dort angekommen bricht er erschöpft zusammen. Jetzt will er nur noch schlafen."},
{"date":"2015, 05, 17","title":"Im Bus nach Österreich","location":"Ungarn","lat":47.162494,"lng":19.503304,"accuracy":0,"action":"warten","feelings":"erschöpft","type":"Video","description":"Nach stundenlangem Warten findet der Schleuser die Gruppe im Wald wieder. Doch noch auf dem Weg zum Fahrzeug wird ein Teil der Gruppe von der ungarischen Polizei festgenommen. Ramis Gruppe hat Glück. Sie liefen weiter hinten und konnten sich rechtzeitig in einem Erdloch einbuddeln. Stundenlang wagen sie es nicht, sich zu rühren. &quot;Das war das Schlimmste, was ich in meinem Leben erlebt habe&quot;, sagt Rami. &quot;Wir haben uns mit Erde bedeckt.&quot; Als die Polizei weg ist, erreichen sie das Fahrzeug. Auf der Ladefläche des Vans geht es nach Österreich. Rami hofft, schon in wenigen Stunden einen Bekannten in Wien zu treffen, bei dem er sich verstecken kann. Die Gruppe wirkt völlig erschöpft."},
{"date":"2015, 05, 17","title":"Das Wald-Versteck","location":"Grenzgebiet zw. Ungarn und Serbien","lat":46.167468,"lng":19.605103,"accuracy":1,"action":"","feelings":"","type":"Video","description":"Es ist der dritte Versuch nach Ungarn zu gelangen. Rami wirkt sehr angespannt. Wenn es diesmal nicht klappt, dann wisse er nicht mehr weiter, sagt er. Der Schleuser hat der Gruppe eine Route durch den Wald genannt. Plötzlich hören sie Hundegebell, die Polizei ist hinter ihnen her. Sie müssen sich wieder verstecken - und warten auf ein Fahrzeug, das der Schleuser organisiert hat und das sie endlich abholt."},
{"date":"2015, 05, 16","title":"Zurück in Belgrad","location":"Belgrad","lat":44.786568,"lng":20.448922,"accuracy":2,"action":"","feelings":"","type":"Text","description":"Rami und die anderen Flüchtlinge sind wieder auf freiem Fuß und erst einmal wieder zurück in dem Apartment in Belgrad. Der Schleuser erzählt ihnen, dass die deutsche Bundespolizei im Grenzgebiet zwischen Serbien und Ungarn patrouilliert. Gestern wurden Polizeiwagen mit Berliner Kennzeichen gesichtet, sie bewachen auf ungarischem Gebiet die EU-Außengrenze. Rami scheint es, als würde diese Grenzüberquerung komplizierter als gedacht. Morgen soll es den nächsten Versuch geben."},
{"date":"2015, 05, 15","title":"In Gewahrsam","location":"","lat":null,"lng":null,"accuracy":null,"action":"warten","feelings":"ungewissheit","type":"Image","description":"Rami und die anderen Flüchtlinge sind in einem serbischen Gefängnis eingesperrt, sie wissen nicht was mit Ihnen passiert. Da sie keine gültigen Papiere für Serbien haben, können sie theoretisch ausgewiesen werden. Aber die serbischen Beamten scheinen kein besonders großes Interesse an einer Ausweisung nach Mazedonien zu haben. Die Polizei weiß, dass die Flüchtlinge nur auf der &quot;Durchreise&quot; sind und auf dem schnellsten Weg weiter nach Ungarn wollen. Die nationalkonservative Regierung in Ungarn hat deshalb angekündigt, die Grenze zu Serbien mit einem vier Meter hohen Zaun zu schließen. Rami bleibt also nicht mehr viel Zeit, die Situation im Grenzgebiet wird sich zunehmend verschärfen."},
{"date":"2015, 05, 14","title":"Erwischt!","location":"","lat":null,"lng":null,"accuracy":null,"action":"Auto","feelings":"frustriert","type":"Video","description":"Es ist der zweite Versuch, nach Ungarn zu gelangen. Doch auch diesmal haben haben Rami und die anderen Flüchtlinge kein Glück. Eine serbische Polizeistreife hält ihren Van an, noch bevor sie die Grenze überqueren können. Im Polizeibus geht es zurück nach Belgrad."},
{"date":"2015, 05, 13","title":"Der Autounfall","location":"nahe der ungarischen Grenze","lat":46.167468,"lng":19.605103,"accuracy":1,"action":"warten","feelings":"angst","type":"Text","description":"In mehreren Gruppen brechen die Flüchtlinge mit dem Auto zur Grenze auf. Rami ist in der zweiten Gruppe, als sich der Schleuser früher als erwartet bei ihnen meldet. Die erste Gruppe hatte einen Autounfall, kurz nach der Grenze, es gab Verletzte. Eine Weiterreise ist jetzt zu gefährlich, die Behörden sind alarmiert - also Abbruch. Rami und die anderen müssen zurück nach Belgrad."},
{"date":"2015, 05, 13","title":"Das Luxus-Apartment","location":"Belgrad","lat":44.786568,"lng":20.448922,"accuracy":2,"action":"warten","feelings":"positiv","type":"Image","description":"Kaum zu glauben, aber die letzte Nacht haben Rami und die anderen Flüchtlinge in einem luxuriösen Apartment in einem noblen Belgrader Viertel verbracht. Der serbische Schleuser hat die Wohnung angemietet, um Flüchtlinge auf der Durchreise zu verstecken. Er hat Rami versprochen, dass er sie mit dem Auto zur ungarischen Grenze bringt. Das letzte Stück muss die Gruppe alleine zu Fuß durch den Wald laufen. In dem Apartment packen die Flüchtlinge ihre Sachen für die Grenzüberquerung."},
{"date":"2015, 05, 12","title":"Ein neuer Schlösser","location":"Belgrad","lat":44.786568,"lng":20.448922,"accuracy":2,"action":"warten","feelings":"schmerzen","type":"Image","description":"Ramis Schmerzen im Knie werden immer schlimmer. Doch Ausruhen ist keine Option. Die letzte Nacht hat er in einer günstigen Pension verbracht, in der viele Flüchtlinge schlafen. Doch Rami will Serbien möglichst schnell verlassen. Mit jedem zusätzlichen Tag steigt auch das Risiko erwischt oder überfallen zu werden. In einem Café ist er mit einem neuen Schleuser verabredet. Der Mann ist Serbe, nennt sich Alex und gilt als Schlüsselfigur in der Schleuserszene mit wichtigen Verbindungen zur Mafia."},
{"date":"2015, 05, 10","title":"","location":"Belgrad","lat":44.786568,"lng":20.448922,"accuracy":2,"action":"schlafen","feelings":"erleichtert","type":"Video","description":"Rami hat es geschafft. Noch in der Nacht erreicht er Serbiens Hauptstadt. Aber die vergangenen Tage haben ihre Spuren hinterlassen: Rami hat am ganzen Körper Schrammen, vor allem aber schmerzt sein Knie. Er kann sich kaum noch auf den Beinen halten. Er müsste eigentlich dringend in ein Krankenhaus - doch er traut sich nicht, denn er will jeden Kontakt mit den Behörden vermeiden, aus Angst inhaftiert zu werden. Die Nacht verbringt er deshalb in einem Park, gemeinsam mit vielen anderen Flüchtlingen."},
{"date":"2015, 05, 10","title":"Verfolgung mit Hunden","location":"in der Nähe der mazedonisch-serbischen Grenze","lat":42.312862,"lng":21.967163,"accuracy":1,"action":"laufen","feelings":"angst","type":"Video","description":"Doch die nächtliche Wanderung entwickelt sich für Rami und seine Begleiter zur Verfolgungsjagd. Plötzlich hören sie Hundegebell. Es ist die Polizei! Mitten im Wald, kurz hinter der mazedonisch-serbischen Grenze. Polizisten mit Hunden suchen offenbar nach Flüchtlingen. Ramis Gruppe versteckt sich im Dickicht."},
{"date":"2015, 05, 10","title":"Nachts nach Serbien","location":"in der Nähe der mazedonisch-serbischen Grenze","lat":42.312862,"lng":21.967163,"accuracy":1,"action":"warten","feelings":"erleichtert","type":"Video","description":"Acht Stunden lang müssen Rami und die anderen Flüchtlinge im Keller ausharren, ohne Essen und Trinken. Im Schutz der Dunkelheit verlässt die Gruppe das Kellerversteck. In einem Waldstück wollen sie die Grenze zu Serbien passieren. Die Gruppe wirkt ziemlich erleichtert. Aber sie sind sich nicht sicher, ob sie tatsächlich schon in Serbien sind."},
{"date":"2015, 05, 09","title":"Das Kellerversteck","location":"Kumanovo","lat":42.132289,"lng":21.725694,"accuracy":2,"action":"laufen","feelings":"angst","type":"Video","description":"Rami und die anderen Flüchtlinge aus der Gruppe kommen in der mazedonischen Stadt Kumanovo an, an der Grenze zu Serbien. Sie hören Schüsse. Ganz in der Nähe kommt es zu Gefechten, nach einem Anti-Terror-Einsatz mazedonischer Sicherheitskräfte gegen bewaffnete albanische Kämpfer. Der Schleuser versteckt Rami und seine Begleiter in einem Keller. Doch das Wasser wird langsam knapp."},
{"date":"2015, 05, 08","title":"Der Überfall","location":"Mazedonien","lat":41.608635,"lng":21.745275,"accuracy":0,"action":"laufen","feelings":"angst","type":"Image","description":"Rami wirkt niedergeschlagen. Seine Gruppe wurde ausgeraubt. Das ganze Geld und der Proviant sind weg. Zum Glück wurde niemand aus der Gruppe bei dem Überfall verletzt. Allerdings müssen die Männer sich jetzt den Rest des Tages ohne Wasser durchschlagen."},
{"date":"2015, 05, 08","title":"Die grüne Grenze","location":"im Süden Mazedonien","lat":41.140399,"lng":22.494507,"accuracy":1,"action":"laufen","feelings":"","type":"Video","description":"Die Schlauchbootfahrt hat geklappt. Rami ist nun zu Fuß unterwegs, mit einer Gruppe junger Männer geht es Querfeldein. In der Dunkelheit überqueren sie in einem Wald die griechisch-mazedonische Grenze. Jetzt laufen sie auf abgeschiedenen Feldwegen Richtung Norden."},
{"date":"2015, 05, 06","title":"Im Schlauchboot","location":"Mittelmeer","lat":40.640063,"lng":22.944419,"accuracy":1,"action":"Schlauchboot","feelings":"angst","type":"Video","description":"Es geht wieder los. Mit seinen neuen Wanderschuhen macht sich Rami auf den Weg. Um zum Ausgangspunkt für die &quot;Black Road&quot; zu gelangen, muss er noch einmal in ein Schlauchboot. Dabei hatte er sich eigentlich geschworen, sich nie wieder in ein Schlauchboot zu setzen."},
{"date":"2015, 05, 04","title":"Die Route des Todes","location":"Thessaloniki","lat":40.640063,"lng":22.944419,"accuracy":2,"action":"Idee","feelings":"angst","type":"Video","description":"Rami ist vor dem Schleuser nach Thessaloniki geflohen, ohne seinen Pass. Er hat inzwischen einen neuen Plan. Er will jetzt über den gefährlichen Landweg nach Deutschland, über die &quot;Black Road&quot;, via Mazedonien, Serbien und Ungarn. Die Route ist so gefährlich, dass Flüchtlinge sie die &quot;Route des Todes&quot; nennen. <br>In Thessaloniki hört er von anderen Flüchtlingen schlimme Geschichten über Folter und Misshandlungen durch die Polizei. Doch Rami fürchtet sich nicht nur vor der Polizei – auf der &quot;Black Road&quot; werden Flüchtlinge häufig von kriminellen Banden ausgeraubt, die genau wissen, dass die Flüchtlinge viel Bargeld bei sich haben. Trotzdem will Rami an dem Plan festhalten. Für die Route braucht er wieder einen neuen Schlepper. Und er braucht Wanderschuhe."},
{"date":"2015, 04, 21","title":"Tödliche Bedrohung","location":"Athen","lat":37.983917,"lng":23.729360,"accuracy":2,"action":"Flugzeug","feelings":"angst","type":"Text","description":"Inzwischen sind elf Tage seit dem ersten Fluchtversuch am Flughafen vergangen. In dieser Zeit hat Rami fünf weitere Versuche unternommen, mit dem Flugzeug Athen zu verlassen. Alle sind gescheitert. <br>Der Schleuser bietet Rami überraschend an, ihm ein Visum zu besorgen. Rami gibt ihm seinen Pass, das wertvollste Dokument, das er besitzt. Doch das versprochene Visum ist eine Fälschung. Ein gefälschtes Visum, so fürchtete Rami, könnte später ein Asylverfahren in Deutschland gefährden. Als Rami seinen Pass deshalb zurückhaben will, fordert der Schleuser 5.000 Euro von ihm. <br>Rami droht dem Schleuser, ihn bei der Polizei anzuzeigen. Daraufhin zückt der Schleuser eine Pistole."},
{"date":"2015, 04, 10","title":"Athen, Omonia-Platz","location":"Athen, Omonia-Platz","lat":37.984167,"lng":23.727778,"accuracy":3,"action":"Laufen","feelings":"","type":"Video","description":"Rami ist auf der Suche nach einer neuen Unterkunft für die Nacht. Im Stadtteil rund um den Omonia-Platz trifft er auf viele Flüchtlinge, die in Athen gestrandet sind. Sie scheinen sich in diesem Viertel sicher zu fühlen, denn die Polizisten ignorieren das Treiben rund um den Platz weitgehend. In einem arabischen Restaurant erholt er sich und macht sich Gedanken, wie es weitergehen soll."},
{"date":"2015, 04, 10","title":"Start - ohne Rami","location":"Athen","lat":37.983917,"lng":23.729360,"accuracy":2,"action":"Flugzeug/Taxi","feelings":"","type":"Video","description":"Nur noch wenige Meter trennen Rami von der Lufthansa-Maschine, die ihn nach Berlin bringen soll. Deutschland, das Ziel seiner Flucht, ist ganz nah. Doch dann tauchen zwei Beamte der deutschen Bundespolizei auf. Sie kontrollieren ihn, bemerken offenbar die Ausweis-Fälschung und übergeben Rami ihren griechischen Kollegen. Die Maschine nach Berlin startet ohne ihn. <br>Stundenlang wird Rami von den griechischen Beamten verhört, dann lassen sie ihn überraschend frei. Mit dem Taxi fährt er zurück in die Athener Innenstadt."},
{"date":"2015, 04, 10","title":"Am Flughafen","location":"Athen, Flughafen","lat":37.932487,"lng":23.941612,"accuracy":3,"action":"Bus/Laufen","feelings":"","type":"Video","description":"Auf Anweisung des Schleusers fährt Rami früh morgens zum Flughafen. Er lässt vieles von dem, was er noch bei sich hatte im Hotelzimmer zurück, um am Flughafen nicht aufzufallen. Seine echten Dokumente hat er im Aktenkoffer versteckt, die bräuchte er später für ein Asylverfahren in Deutschland.\nAm Flughafen überreicht ihm ein fremder Mann im Vorbeigehen wortlos den gefälschten Ausweis. Kurz darauf steckt ihm ein anderer Mann das Flugticket zu. Auf dem Ticket steht: Berlin, Schönefeld. Rami passiert den Sicherheitscheck und kurz darauf die Passkontrolle. Jetzt wartet er am Gate."},
{"date":"2015, 04, 09","title":"Die Verkleidung","location":"Athen","lat":37.983917,"lng":23.729360,"accuracy":2,"action":"","feelings":"","type":"Video","description":"In Athen trifft Rami einen neuen Schleuser, der ihm verspricht, dass er ihn mit dem Flugzeug nach Deutschland bringt. Für 3.800 Dollar soll er falsche Papiere und ein Flugticket bekommen. &quot;Morgen bist du in Deutschland&quot;, versichert ihm der Schleuser. Er geht zusammen mit Rami einkaufen, denn der soll sich als spanischer Geschäftsmann tarnen. Abends im Hotel - Generalprobe als spanischer Geschäftsmann."},
{"date":"2015, 04, 08","title":"Mit der Fähre nach Athen","location":"zwischen Lesbos und Athen","lat":38.016452,"lng":25.775299,"accuracy":1,"action":"","feelings":"hoffnung","type":"Text","description":"Die griechischen Behörden auf Lesbos lassen Rami frei. Er kauft sich für 50 Euro ein Fährticket und reist als normaler Passagier nach Athen."},
{"date":"2015, 04, 03","title":"Im Auffanglager auf Lesbos","location":"Lesbos","lat":39.106738,"lng":26.557275,"accuracy":2,"action":"","feelings":"","type":"Video","description":""},
{"date":"2015, 04, 02","title":"Endlich, Griechenland!","location":"Lesbos","lat":39.264510,"lng":26.277707,"accuracy":2,"action":"Boot/Küstenwache","feelings":"angst","type":"Video","description":"Es ist dunkel, als das Boot ankommt, doch es ist viel zu klein für die vielen Passagiere. Rami und die anderen quetschen sich trotzdem hinein. Mehrere Stunden sind sie auf dem Wasser, bis die Lichter der Insel Lesbos am Horizont auftauchen. Sie setzen ein Notsignal ab und warten darauf, dass die griechische Küstenwache kommt. Als sie da ist zerstören sie ihr Boot, damit sie nicht zurückgeschickt werden können - so hatte der Schleuser es ihnen empfohlen.\nDie Küstenwache bringt sie zum Auffanglager nach Lesbos. Jetzt ist Rami zum ersten Mal in der EU."},
{"date":"2015, 04, 02","title":"Der Marsch zur Küste","location":"Izmir","lat":38.423734,"lng":27.142826,"accuracy":2,"action":"Transport/Laufen","feelings":"","type":"Text","description":"Der nächste Versuch startet. Wieder geht es in umgebauten Viehtransportern die türkische Küste entlang. Und wieder hält das Fahrzeug in einem Waldgebiet. Hier treffen Rami und die anderen Flüchtlinge auf einen Kontaktmann der Mafia. Stundenlang folgen sie ihm zu Fuß durch den Wald. Der Kontaktmann geht in sicherem Abstand voraus, damit er nicht mit der Gruppe in Verbindung gebracht werden kann, falls die Polizei auftaucht.\nAn einem einsamen Strand bleiben Rami und die anderen stehen. Hier soll das Boot ankommen, mit dem sie zur griechischen Insel Lesbos fahren sollen. Doch noch ist kein Boot in Sicht."},
{"date":"2015, 03, 31","title":"Ramis letzte Chance","location":"Izmir","lat":38.423734,"lng":27.142826,"accuracy":2,"action":"Rettungsboot","feelings":"angst","type":"Image","description":"Die türkische Küstenwache rettet die Schiffbrüchigen in der Nacht aus dem Wasser. Am Morgen wirkt Rami völlig erschöpft. Seine Begleiterin gibt die Flucht auf und will in der Türkei bleiben. Auch Rami scheint zu zweifeln. Er gerät mit seinem Schleuser in Streit, weil er sein Geld zurück haben will. Der macht ihm ein letztes Angebot, ihn mit einem Schlauchboot nach Griechenland zu bringen. Rami willigt ein."},
{"date":"2015, 03, 30","title":" Kampf ums Überleben","location":"in der Nähe von Izmir","lat":38.600103,"lng":26.807327,"accuracy":1,"action":"Schlauchboot","feelings":"angst","type":"Video","description":"Rami und die anderen Flüchtlinge müssen das Schlauchboot für die Überfahrt zur griechischen Insel selber aufblasen. Um 20 Uhr geht es los. Der Regen wird immer stärker. Nach knapp einer halben Stunde bricht auf dem Boot Panik aus. Die Wellen sind so hoch, dass das Boot voll Wasser läuft."},
{"date":"2015, 03, 30","title":"Rettungswesten","location":"in der Nähe von Izmir","lat":38.600103,"lng":26.807327,"accuracy":1,"action":"Laufen","feelings":"nervös","type":"Video","description":"Inzwischen ist die Gruppe im Viehtransporter an der Küste angekommen. Alle warten auf das Schlauchboot, doch es gibt ein Problem: Es hat angefangen zu regnen. Rami und die anderen Flüchtlinge scheinen sehr nervös."},
{"date":"2015, 03, 30","title":" Im Viehtransporter","location":"in der Nähe von Izmir","lat":38.600103,"lng":26.807327,"accuracy":1,"action":"Transporter","feelings":"nervös","type":"Image","description":"Rami fährt mit anderen Flüchtlingen in Richtung Küste, in umgebauten Viehtransportern. Unter den 42 Personen sind auch Kinder. Stundenlang geht es auf holprigen Nebenstraßen durch die Wälder. Plötzlich bleibt der Transporter stehen. Niemand wagt auszusteigen. Stundenlang passiert nichts. Rami checkt den Wetterbericht. Es sieht nicht gut aus, Gewitter und Sturm sind angekündigt"},
{"date":"2015, 03, 23","title":"Der neue Schleuser","location":"Izmir","lat":38.423734,"lng":27.142826,"accuracy":2,"action":"","feelings":"","type":"Audio","description":"Rami ist in Izmir angekommen. Er erkundigt sich bei anderen Syrern, die in der Stadt nach einer Möglichkeit zur Flucht suchen. Und er bekommt einen entscheidenden Tipp. Er geht in ein arabisches Restaurant und trifft dort den Schleuser Abu Halabi.\nDer Schleuser verspricht ihm, ihn und andere mit einem Schlauchboot zu einer griechischen Insel zu bringen. Dann wäre Rami in der EU. Von dort könnte er anschließend mit einer Fähre zum griechischen Festland fahren und dann weiter nach Deutschland reisen. Sie haben sich schließlich auf einen Preis von 3.500 Dollar geeinigt."},
{"date":"2015, 03, 14","title":"Sackgasse Mersin","location":"Mersin","lat":36.812104,"lng":34.641481,"accuracy":2,"action":"","feelings":"frustriert ","type":"Image","description":"Mersin entwickelt sich zur Sackgasse. Von hier aus scheinen Rami und seine Begleiterin eine Flucht nicht schaffen zu können. Sie haben bereits viel Zeit verloren. Rami fordert deshalb sein Geld vom Schlepper, um nach Izmir fahren zu können. Die Stadt liegt im Norden der Türkei. Von dort wollen sie irgendwie nach Griechenland kommen."},
{"date":"2015, 03, 11","title":"Wo ist das Boot?","location":"Mersin Meer","lat":36.770517,"lng":34.578094,"accuracy":2,"action":"","feelings":"hoffnung","type":"Video","description":"Der erste Fluchtversuch misslingt. Rami und andere Flüchtlinge werden zwar morgens aus dem Hotel abgeholt, doch am vereinbarten Treffpunkt ist kein Boot. Kein Boot, das sie nach Nordzypern bringen kann. Als es hell wird, müssen sie nach Mersin zurückkehren.\nTrotzdem hofft Rami weiterhin, irgendwie nach Deutschland zu kommen."},
{"date":"2015, 03, 10","title":"Rami und die türkische Mafia","location":"Mersin","lat":36.812104,"lng":34.641481,"accuracy":2,"action":"","feelings":"","type":"Video","description":"Ramis türkischer Schleuser arbeitet offenbar mit der Mafia zusammen. Der Plan: Die türkische Mafia holt Rami und die anderen Flüchtlinge aus den Verstecken in Mersin ab und bringt sie zu den kleinen Booten am Wasser. Mit denen geht es dann zu einem großen Containerschiff, das vor Zypern auf sie wartet. Das Schiff soll sie dann nach Italien bringen.\n&quot;Wenn Beamte bestochen werden müssen, dann übernimmt das die Mafia&quot;, sagt der Schleuser zu Rami. Für den Transport werden die Flüchtlinge in Gruppen eingeteilt."},
{"date":"2015, 03, 09","title":"Der Deal mit dem Schleuser","location":"Mersin","lat":36.812104,"lng":34.641481,"accuracy":2,"action":"","feelings":"frustriert ","type":"Video","description":"Rami ist jetzt bereits seit drei Monaten in Mersin, im Süden der Türkei. Von hier aus sind in den vergangenen Jahren viele Flüchtlinge auf Containerschiffen nach Italien gestartet, doch die Kontrollen sind strenger geworden. Seit Weihnachten hat kein Flüchtlingsboot mehr den Hafen verlassen.\nNach langem Suchen findet Rami einen Schleuser, der ihm ein Angebot zur Flucht nach Italien macht. 6.000 Euro soll die Überfahrt pro Person kosten. 3.000 Euro zahlt Rami in bar an. Inzwischen hat sich eine Syrerin Rami angeschlossen, die ebenfalls nach Italien fliehen will."},
{"date":"2014, 12, 25","title":"Ramis Leben vor der Flucht","location":"Damaskus","lat":33.493496,"lng":36.284775,"accuracy":2,"action":"","feelings":"stress","type":"Image","description":"Über Nacht packt Rami seine wichtigsten Dokumente in einen Rucksack, Zeugnisse, Beglaubigungen, Abschlüsse. Er will nach Deutschland. Viel kann er auf seiner Flucht nicht mitnehmen, seine Eltern wird er zurücklassen müssen. Er will sie später nachholen. Das verspricht er ihnen.\nNoch in der Nacht bricht er auf, erst in den Libanon und dann in die Türkei. Eine legale Ausreise nach Deutschland ist nicht möglich, dafür bräuchte er ein Visum, das er nicht bekommen kann."},
{"date":"2014, 12, 25","title":"Die Flucht beginnt","location":"Damaskus","lat":33.493496,"lng":36.284775,"accuracy":2,"action":"","feelings":"Angst","type":"Text","description":"Es ist Winter in Damaskus. Rami sitzt mit seiner Familie zusammen, als er den Brief mit dem Befehl zur Einberufung in die Armee erhält. Er soll im Kampf gegen den Islamischen Staat (IS) an die Front. Viele Freunde und Bekannte sind in diesem Krieg bereits ums Leben gekommen, andere sind geflohen. Syrien, sein Heimatland, ist nicht länger sicher für ihn."}],

  actions: {
    addNewStory: function () {
      let story = this.get('model');
      this.get('jsonChapters').forEach(bind(this, function (chapter) {
        let newChapter = this.store.createRecord('chapter', {
          title: chapter.title,
          description: chapter.description,
          location: chapter.location,
          lat: chapter.lat,
          lng: chapter.lng,
          date: new Date(chapter.date),
          accuracy: chapter.accuracy,
          action: chapter.action,
          feeling: chapter.feelings,
          type: chapter.type,
        });
        story.get('chapters').pushObject(newChapter);

        newChapter.save().then(function () {
          return story.save();
        });
      }));
    }
  }
});
