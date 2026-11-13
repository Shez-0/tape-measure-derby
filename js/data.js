/* =====================================================================
   QUESTION BANK
   Each answer is "Name:tier|alias|alias", separated by ";".
   tier 1 = the answer everybody gives ... tier 5 = almost nobody thinks of it.
   Inside a tier, earlier names count as more common (shorter hits).
   Team questions (team:true) list nicknames from the TEAMS table below.
   The tiers are editorial estimates. Edit them freely.
   ===================================================================== */

const TEAMS = {
  "Diamondbacks":["Arizona Diamondbacks","D-backs","Dbacks","Arizona","Snakes"],
  "Braves":["Atlanta Braves","Atlanta"],
  "Orioles":["Baltimore Orioles","Baltimore","O's"],
  "Red Sox":["Boston Red Sox","Boston","BoSox"],
  "Cubs":["Chicago Cubs","Cubbies"],
  "White Sox":["Chicago White Sox","ChiSox","South Siders"],
  "Reds":["Cincinnati Reds","Cincinnati","Cincy"],
  "Guardians":["Cleveland Guardians","Cleveland","Indians","Cleveland Indians"],
  "Rockies":["Colorado Rockies","Colorado","Denver","Rox"],
  "Tigers":["Detroit Tigers","Detroit"],
  "Astros":["Houston Astros","Houston","Stros","Colt 45s"],
  "Royals":["Kansas City Royals","Kansas City","KC"],
  "Angels":["Los Angeles Angels","LA Angels","Anaheim Angels","California Angels","Anaheim","Halos"],
  "Dodgers":["Los Angeles Dodgers","LA Dodgers","Brooklyn Dodgers","Brooklyn"],
  "Marlins":["Miami Marlins","Miami","Florida Marlins","Florida"],
  "Brewers":["Milwaukee Brewers","Milwaukee","Brew Crew","Seattle Pilots","Pilots"],
  "Twins":["Minnesota Twins","Minnesota"],
  "Mets":["New York Mets","NY Mets","Metropolitans","Amazins"],
  "Yankees":["New York Yankees","NY Yankees","Yanks","Bronx Bombers"],
  "Athletics":["Athletics","A's","Oakland Athletics","Oakland A's","Oakland","Sacramento Athletics","Sacramento"],
  "Phillies":["Philadelphia Phillies","Philadelphia","Philly","Phils"],
  "Pirates":["Pittsburgh Pirates","Pittsburgh","Bucs","Buccos"],
  "Padres":["San Diego Padres","San Diego","Friars"],
  "Giants":["San Francisco Giants","San Francisco","SF Giants","SF","New York Giants"],
  "Mariners":["Seattle Mariners","Seattle","M's"],
  "Cardinals":["St. Louis Cardinals","St Louis","Saint Louis","Cards","Redbirds"],
  "Rays":["Tampa Bay Rays","Tampa Bay","Tampa","Devil Rays","Tampa Bay Devil Rays"],
  "Rangers":["Texas Rangers","Texas"],
  "Blue Jays":["Toronto Blue Jays","Toronto","Jays"],
  "Nationals":["Washington Nationals","Washington","Nats","Montreal Expos","Expos","Montreal"]
};

const QUESTIONS = [

/* ----------------------------- ROSTERS ----------------------------- */
{cat:"Rosters", text:"Name a player on the 2024 New York Mets", a:`
Francisco Lindor:1;Pete Alonso:1;Brandon Nimmo:1;Edwin Diaz:1;Jeff McNeil:2;Mark Vientos:2;Francisco Alvarez:2;Starling Marte:2;Sean Manaea:2;Luis Severino:2;Jose Iglesias:2;J.D. Martinez:2;Kodai Senga:2;David Peterson:3;Jose Quintana:3;Jesse Winker:3;Harrison Bader:3;Tyrone Taylor:3;Brett Baty:3;Tylor Megill:3;Adam Ottavino:3;Luisangel Acuna:3;Reed Garrett:4;Phil Maton:4;Ryne Stanek:4;Jose Butto:4;DJ Stewart:4;Luis Torrens:4;Paul Blackburn:4;Christian Scott:4;Jorge Lopez:4;Drew Smith:4;Jake Diekman:4;Tomas Nido:4;Omar Narvaez:4;Brooks Raley:4;Adrian Houser:4;Joey Wendle:5;Dedniel Nunez:5;Huascar Brazoban:5;Danny Young:5;Sean Reid-Foley:5;Ben Gamel:5;Zack Short:5;Joey Lucchesi:5;Michael Tonkin:5;Alex Young:5;Eddy Alvarez:5;Josh Walker:5;Grant Hartwig:5`},

{cat:"Rosters", text:"Name a player on the 2025 New York Mets", a:`
Juan Soto:1;Francisco Lindor:1;Pete Alonso:1;Brandon Nimmo:1;Edwin Diaz:1;Kodai Senga:2;Jeff McNeil:2;Francisco Alvarez:2;Mark Vientos:2;Sean Manaea:2;Clay Holmes:2;David Peterson:2;Nolan McLean:2;Starling Marte:3;Brett Baty:3;Tylor Megill:3;Luisangel Acuna:3;Ronny Mauricio:3;Tyrone Taylor:3;Cedric Mullins:3;Ryan Helsley:3;Jonah Tong:3;Griffin Canning:3;Luis Torrens:4;Frankie Montas:4;Jesse Winker:4;Tyler Rogers:4;Gregory Soto:4;Brandon Sproat:4;Reed Garrett:4;Ryne Stanek:4;A.J. Minter:4;Brooks Raley:4;Huascar Brazoban:4;Jose Siri:4;Paul Blackburn:5;Jose Butto:5;Max Kranick:5;Jared Young:5;Hayden Senger:5;Dedniel Nunez:5;Jose Castillo:5;Danny Young:5;Blade Tidwell:5;Justin Hagenman:5;Chris Devenski:5`},

{cat:"Rosters", text:"Name a player on the 1986 New York Mets (World Series champs)", a:`
Dwight Gooden:1|Doc Gooden;Darryl Strawberry:1;Keith Hernandez:1;Gary Carter:1;Mookie Wilson:2;Lenny Dykstra:2;Ron Darling:2;Jesse Orosco:2;Ray Knight:2;Wally Backman:3;Bob Ojeda:3|Bobby Ojeda;Sid Fernandez:3;Howard Johnson:3|HoJo;Kevin Mitchell:3;Roger McDowell:3;Rafael Santana:4;Tim Teufel:4;Rick Aguilera:4;George Foster:4;Lee Mazzilli:4;Danny Heep:5;Doug Sisk:5;Ed Hearn:5;Kevin Elster:5;Randy Niemann:5;Bruce Berenyi:5;Stanley Jefferson:5;Dave Magadan:5;Randy Myers:5;John Gibbons:5;Barry Lyons:5;Rick Anderson:5;John Mitchell:5;Terry Leach:5;Tim Corcoran:5`},

{cat:"Rosters", text:"Name a player on the 2000 New York Mets (Subway Series)", a:`
Mike Piazza:1;Al Leiter:1;Edgardo Alfonzo:2;Robin Ventura:2;John Franco:2;Mike Hampton:2;Armando Benitez:2;Todd Zeile:3;Benny Agbayani:3;Jay Payton:3;Rey Ordonez:3;Timo Perez:3;Rick Reed:3;Turk Wendell:3;Bobby Jones:4;Mike Bordick:4;Derek Bell:4;Todd Pratt:4;Glendon Rusch:4;Dennis Cook:4;Rickey Henderson:4;Lenny Harris:4;Joe McEwing:4;Darryl Hamilton:5;Kurt Abbott:5;Bubba Trammell:5;Matt Franco:5;Pat Mahomes:5;Rick White:5;Melvin Mora:5;Jon Nunnally:5;Jason Tyner:5;Mark Johnson:5;Rich Rodriguez:5`},

{cat:"Rosters", text:"Name a player on the 2015 New York Mets (NL champs)", a:`
Jacob deGrom:1;David Wright:1;Yoenis Cespedes:1;Matt Harvey:1;Noah Syndergaard:1;Daniel Murphy:2;Jeurys Familia:2;Curtis Granderson:2;Bartolo Colon:2;Michael Conforto:2;Lucas Duda:2;Wilmer Flores:2;Travis d'Arnaud:3;Steven Matz:3;Juan Lagares:3;Ruben Tejada:3;Michael Cuddyer:3;Juan Uribe:4;Kelly Johnson:4;Tyler Clippard:4;Addison Reed:4;Jon Niese:4;Kevin Plawecki:4;Kirk Nieuwenhuis:4;Jenrry Mejia:4;Dillon Gee:4;Hansel Robles:5;Sean Gilmartin:5;Carlos Torres:5;Erik Goeddel:5;Jerry Blevins:5;Bobby Parnell:5;Logan Verrett:5;John Mayberry Jr.:5;Eric Campbell:5;Dilson Herrera:5;Anthony Recker:5;Eric Young Jr.:5;Darrell Ceciliani:5;Danny Muno:5;Johnny Monell:5;Eric O'Flaherty:5;Alex Torres:5`},

{cat:"Rosters", text:"Name a player on the 1969 \"Miracle\" Mets", a:`
Tom Seaver:1;Nolan Ryan:1;Jerry Koosman:2;Tommie Agee:2;Cleon Jones:2;Tug McGraw:2;Bud Harrelson:3;Jerry Grote:3;Ed Kranepool:3;Ron Swoboda:3;Donn Clendenon:3;Gary Gentry:4;Art Shamsky:4;Al Weis:4;Ed Charles:4;Ken Boswell:4;Wayne Garrett:5;Rod Gaspar:5;J.C. Martin:5;Duffy Dyer:5;Don Cardwell:5;Jim McAndrew:5;Cal Koonce:5;Ron Taylor:5;Jack DiLauro:5;Bobby Pfeil:5;Amos Otis:5;Kevin Collins:5`},

{cat:"Rosters", text:"Name a player on the 2024 New York Yankees (AL champs)", a:`
Aaron Judge:1;Juan Soto:1;Giancarlo Stanton:1;Gerrit Cole:1;Anthony Volpe:2;Gleyber Torres:2;Anthony Rizzo:2;Jazz Chisholm Jr.:2|Jazz Chisholm|Jazz;Carlos Rodon:2;Austin Wells:2;Alex Verdugo:2;Luis Gil:2;Nestor Cortes:3;Clay Holmes:3;Luke Weaver:3;DJ LeMahieu:3;Jasson Dominguez:3;Marcus Stroman:3;Clarke Schmidt:3;Trent Grisham:3;Jose Trevino:3;Ben Rice:3;Oswaldo Cabrera:4;Tommy Kahnle:4;Ian Hamilton:4;Jon Berti:4;Oswald Peraza:4;Mark Leiter Jr.:4;Tim Hill:4;Jonathan Loaisiga:4;Jake Cousins:5;Caleb Ferguson:5;Ron Marinaccio:5;Victor Gonzalez:5;Cody Poteet:5;Dennis Santana:5;Will Warren:5;Jahmai Jones:5;J.D. Davis:5;Michael Tonkin:5;Duke Ellis:5;Enyel De Los Santos:5;Carlos Narvaez:5;Nick Burdi:5`},

{cat:"Rosters", text:"Name a player on the 2009 New York Yankees (World Series champs)", a:`
Derek Jeter:1;Alex Rodriguez:1|A-Rod;Mariano Rivera:1;CC Sabathia:1;Mark Teixeira:2;Jorge Posada:2;Andy Pettitte:2;Hideki Matsui:2;Johnny Damon:2;Robinson Cano:2;Nick Swisher:3;A.J. Burnett:3;Melky Cabrera:3;Brett Gardner:3;Joba Chamberlain:3;Phil Hughes:3;David Robertson:4;Alfredo Aceves:4;Phil Coke:4;Jose Molina:4;Jerry Hairston Jr.:4;Eric Hinske:4;Francisco Cervelli:4;Chien-Ming Wang:4;Xavier Nady:4;Damaso Marte:5;Brian Bruney:5;Ramiro Pena:5;Cody Ransom:5;Chad Gaudin:5;Sergio Mitre:5;Angel Berroa:5;Shelley Duncan:5;Mark Melancon:5;Jose Veras:5;Brett Tomko:5;Jonathan Albaladejo:5;Edwar Ramirez:5;Freddy Guzman:5;Juan Miranda:5`},

{cat:"Rosters", text:"Name a player on the 1998 New York Yankees (114 wins)", a:`
Derek Jeter:1;Mariano Rivera:1;Bernie Williams:2;Paul O'Neill:2;Tino Martinez:2;Jorge Posada:2;Andy Pettitte:2;David Cone:2;David Wells:2;Scott Brosius:3;Chuck Knoblauch:3;Darryl Strawberry:3;Tim Raines:3;Orlando Hernandez:3|El Duque;Joe Girardi:3;Chili Davis:4;Hideki Irabu:4;Mike Stanton:4;Jeff Nelson:4;Shane Spencer:4;Luis Sojo:4;Ramiro Mendoza:5;Graeme Lloyd:5;Homer Bush:5;Ricky Ledee:5;Chad Curtis:5;Darren Holmes:5;Dale Sveum:5;Mike Buddie:5`},

{cat:"Rosters", text:"Name a player on the 1927 New York Yankees (Murderers' Row)", a:`
Babe Ruth:1;Lou Gehrig:1;Tony Lazzeri:3;Earle Combs:4;Bob Meusel:4;Waite Hoyt:4;Herb Pennock:4;Mark Koenig:5;Joe Dugan:5;Wilcy Moore:5;Urban Shocker:5;Dutch Ruether:5;George Pipgras:5;Pat Collins:5;Cedric Durst:5;Ray Morehart:5;Benny Bengough:5;Johnny Grabowski:5;Myles Thomas:5;Bob Shawkey:5`},

{cat:"Rosters", text:"Name a player on the 2024 Los Angeles Dodgers (World Series champs)", a:`
Shohei Ohtani:1|Shohei;Mookie Betts:1;Freddie Freeman:1;Yoshinobu Yamamoto:1;Clayton Kershaw:1;Will Smith:2;Teoscar Hernandez:2;Max Muncy:2;Tyler Glasnow:2;Walker Buehler:2;Tommy Edman:3;Kike Hernandez:3|Enrique Hernandez;Jack Flaherty:3;Gavin Lux:3;Evan Phillips:3;Jason Heyward:3;Miguel Rojas:3;Chris Taylor:3;Andy Pages:3;Joe Kelly:3;Blake Treinen:4;Michael Kopech:4;Alex Vesia:4;Brusdar Graterol:4;James Outman:4;Austin Barnes:4;Ryan Brasier:4;Daniel Hudson:4;Gavin Stone:4;Bobby Miller:4;James Paxton:4;Kevin Kiermaier:4;Miguel Vargas:4;Anthony Banda:5;Landon Knack:5;Michael Grove:5;Ben Casparius:5;Kyle Hurt:5;Justin Wrobleski:5;River Ryan:5;Ryan Yarbrough:5;Cavan Biggio:5;Amed Rosario:5;Nick Ahmed:5;Hunter Feduccia:5;Edgardo Henriquez:5`},

{cat:"Rosters", text:"Name a player on the 2025 Los Angeles Dodgers (World Series champs)", a:`
Shohei Ohtani:1|Shohei;Mookie Betts:1;Freddie Freeman:1;Yoshinobu Yamamoto:1;Clayton Kershaw:1;Will Smith:2;Teoscar Hernandez:2;Max Muncy:2;Blake Snell:2;Tyler Glasnow:2;Roki Sasaki:2;Tommy Edman:2;Kike Hernandez:3|Enrique Hernandez;Andy Pages:3;Miguel Rojas:3;Michael Conforto:3;Hyeseong Kim:3|Hye-seong Kim;Tanner Scott:3;Blake Treinen:3;Alex Vesia:3;Emmet Sheehan:4;Dalton Rushing:4;Kirby Yates:4;Dustin May:4;Tony Gonsolin:4;Anthony Banda:4;Alex Call:4;Jack Dreyer:4;Justin Wrobleski:4;Michael Kopech:4;Evan Phillips:4;Chris Taylor:4;Will Klein:5;Ben Casparius:5;Landon Knack:5;Ben Rortvedt:5;Austin Barnes:5;James Outman:5;Brock Stewart:5;Lou Trivino:5;Edgardo Henriquez:5;Justin Dean:5;Matt Sauer:5;Esteury Ruiz:5`},

{cat:"Rosters", text:"Name a player on the 2016 Chicago Cubs (World Series champs)", a:`
Kris Bryant:1;Anthony Rizzo:1;Javier Baez:1|Javy Baez;Jon Lester:1;Jake Arrieta:1;Kyle Schwarber:1;Ben Zobrist:2;Kyle Hendricks:2;Dexter Fowler:2;Jason Heyward:2;Willson Contreras:2;David Ross:2;Aroldis Chapman:2;Addison Russell:3;John Lackey:3;Miguel Montero:3;Albert Almora:3;Jorge Soler:3;Travis Wood:4;Pedro Strop:4;Hector Rondon:4;Carl Edwards Jr.:4;Mike Montgomery:4;Jason Hammel:4;Chris Coghlan:4;Tommy La Stella:5;Matt Szczur:5;Justin Grimm:5;Rob Zastryzny:5;Trevor Cahill:5;Spencer Patton:5;Munenori Kawasaki:5;Joe Nathan:5;Clayton Richard:5;Adam Warren:5;Tim Federowicz:5`},

{cat:"Rosters", text:"Name a player on the 2004 Boston Red Sox (World Series champs)", a:`
David Ortiz:1|Big Papi;Manny Ramirez:1;Pedro Martinez:1;Curt Schilling:1;Johnny Damon:1;Jason Varitek:1;Keith Foulke:2;Kevin Millar:2;Tim Wakefield:2;Dave Roberts:2;Nomar Garciaparra:2;Derek Lowe:3;Bill Mueller:3;Mark Bellhorn:3;Orlando Cabrera:3;Trot Nixon:3;Doug Mientkiewicz:3;Bronson Arroyo:3;Kevin Youkilis:3;Mike Timlin:4;Alan Embree:4;Gabe Kapler:4;Doug Mirabelli:4;Byung-Hyun Kim:4;Pokey Reese:5;Ellis Burks:5;Cesar Crespo:5;Curtis Leskanic:5;Mike Myers:5;Terry Adams:5;Scott Williamson:5;Ramiro Mendoza:5;David McCarty:5;Lenny DiNardo:5;Brian Daubach:5;Ricky Gutierrez:5`},

{cat:"Rosters", text:"Name a player on the 2013 Boston Red Sox (World Series champs)", a:`
David Ortiz:1|Big Papi;Dustin Pedroia:1;Jacoby Ellsbury:2;Jon Lester:2;Koji Uehara:2;Xander Bogaerts:2;Shane Victorino:2;Mike Napoli:3;John Lackey:3;Clay Buchholz:3;Jonny Gomes:3;Jarrod Saltalamacchia:3;Stephen Drew:3;Will Middlebrooks:3;Daniel Nava:4;Jake Peavy:4;David Ross:4;Mike Carp:4;Jackie Bradley Jr.:4;Felix Doubront:4;Ryan Dempster:4;Junichi Tazawa:4;Craig Breslow:4;Jose Iglesias:4;Brandon Workman:5;Andrew Bailey:5;Joel Hanrahan:5;Andrew Miller:5;Franklin Morales:5;Alfredo Aceves:5;Pedro Ciriaco:5;Quintin Berry:5;Ryan Lavarnway:5;Matt Thornton:5;Rubby De La Rosa:5;Allen Webster:5;Brock Holt:5;Brandon Snyder:5;Alex Wilson:5;Drake Britton:5;Clayton Mortensen:5`},

{cat:"Rosters", text:"Name a player on the 2023 Texas Rangers (World Series champs)", a:`
Corey Seager:1;Max Scherzer:1;Jacob deGrom:1;Marcus Semien:2;Adolis Garcia:2;Nathan Eovaldi:2;Aroldis Chapman:2;Jordan Montgomery:3;Evan Carter:3;Josh Jung:3;Mitch Garver:3;Jonah Heim:3;Nathaniel Lowe:3;Will Smith:3;Leody Taveras:4;Robbie Grossman:4;Jose Leclerc:4;Josh Sborz:4;Andrew Heaney:4;Dane Dunning:4;Martin Perez:4;Jon Gray:4;Josh Smith:4;Travis Jankowski:5;Brock Burke:5;Ezequiel Duran:5;Sam Huff:5;Brad Miller:5;Cody Bradford:5;Jonathan Hernandez:5;Grant Anderson:5;Austin Hedges:5;Chris Stratton:5;Bubba Thompson:5;Sandy Leon:5`},

{cat:"Rosters", text:"Name a player on the 2025 Philadelphia Phillies", a:`
Bryce Harper:1;Kyle Schwarber:1;Trea Turner:1;Zack Wheeler:1;Aaron Nola:1;J.T. Realmuto:1;Nick Castellanos:2;Alec Bohm:2;Cristopher Sanchez:2;Ranger Suarez:2;Bryson Stott:2;Brandon Marsh:3;Jhoan Duran:3;Jesus Luzardo:3;Harrison Bader:4;Max Kepler:4;Edmundo Sosa:4;Orion Kerkering:4;Matt Strahm:4;Jordan Romano:4;Taijuan Walker:4;Jose Alvarado:4;David Robertson:4;Johan Rojas:4;Weston Wilson:5;Rafael Marchan:5;Tanner Banks:5;Otto Kemp:5;Mick Abel:5;Joe Ross:5;Walker Buehler:5;Buddy Kennedy:5;Max Lazar:5;Carlos Hernandez:5;Daniel Robert:5`},

{cat:"Rosters", text:"Name a player on the 2008 Philadelphia Phillies (World Series champs)", a:`
Ryan Howard:1;Chase Utley:1;Jimmy Rollins:1;Cole Hamels:1;Brad Lidge:2;Shane Victorino:2;Jayson Werth:2;Pat Burrell:2;Jamie Moyer:2;Carlos Ruiz:3;Brett Myers:3;Ryan Madson:3;Joe Blanton:3;Matt Stairs:3;Pedro Feliz:4;Greg Dobbs:4;Geoff Jenkins:4;J.C. Romero:4;Chris Coste:4;Kyle Kendrick:4;Chad Durbin:4;Eric Bruntlett:5;So Taguchi:5;Clay Condrey:5;Scott Eyre:5;J.A. Happ:5;Adam Eaton:5;Tom Gordon:5;Rudy Seanez:5;Tadahito Iguchi:5;Greg Golson:5;Lou Marson:5;Mike Cervenak:5;Andy Tracy:5;Les Walrond:5;R.J. Swindle:5`},

{cat:"Rosters", text:"Name a player on the 2025 Toronto Blue Jays (AL champs)", a:`
Vladimir Guerrero Jr.:1|Vlad Jr.|Vlad Guerrero Jr.|Vladdy;Bo Bichette:1;George Springer:1;Max Scherzer:2;Kevin Gausman:2;Trey Yesavage:2;Alejandro Kirk:2;Shane Bieber:3;Addison Barger:3;Daulton Varsho:3;Ernie Clement:3;Jose Berrios:3;Chris Bassitt:3;Anthony Santander:3;Andres Gimenez:3;Jeff Hoffman:3;Seranthony Dominguez:4;Louis Varland:4;Davis Schneider:4;Isiah Kiner-Falefa:4|IKF;Nathan Lukes:4;Eric Lauer:4;Ty France:4;Myles Straw:4;Bowden Francis:4;Chad Green:4;Brendon Little:5;Tyler Heineman:5;Yimi Garcia:5;Mason Fluharty:5;Yariel Rodriguez:5;Joey Loperfido:5;Braydon Fisher:5;Tommy Nance:5;Will Wagner:5;Nick Sandlin:5;Jonatan Clase:5;Alan Roden:5;Leo Jimenez:5;Easton Lucas:5;Paxton Schultz:5`},

{cat:"Rosters", text:"Name a player on the 2001 Seattle Mariners (116 wins)", a:`
Ichiro Suzuki:1|Ichiro;Edgar Martinez:2;Bret Boone:2;John Olerud:3;Mike Cameron:3;Jay Buhner:3;Jamie Moyer:3;Freddy Garcia:3;Kazuhiro Sasaki:3;David Bell:4;Dan Wilson:4;Carlos Guillen:4;Mark McLemore:4;Stan Javier:4;Aaron Sele:4;Paul Abbott:4;Arthur Rhodes:4;Jeff Nelson:5;Norm Charlton:5;Al Martin:5;Charles Gipson:5;John Halama:5;Joel Pineiro:5;Brett Tomko:5;Tom Lampkin:5;Ed Sprague:5;Jose Paniagua:5;Ryan Franklin:5`},

{cat:"Rosters", text:"Name a player on the 2017 Houston Astros (World Series champs)", a:`
Jose Altuve:1;Carlos Correa:1;George Springer:1;Alex Bregman:1;Justin Verlander:1;Dallas Keuchel:2;Yuli Gurriel:2;Carlos Beltran:2;Lance McCullers Jr.:2;Charlie Morton:3;Josh Reddick:3;Marwin Gonzalez:3;Brian McCann:3;Evan Gattis:3;Ken Giles:3;Brad Peacock:4;Chris Devenski:4;Joe Musgrove:4;Will Harris:4;Collin McHugh:4;Jake Marisnick:4;Mike Fiers:4;Francisco Liriano:4;Luke Gregerson:5;Derek Fisher:5;Cameron Maybin:5;Nori Aoki:5|Norichika Aoki;Juan Centeno:5;Max Stassi:5;Tyler White:5;Tony Sipp:5;Michael Feliz:5;Tyler Clippard:5;Francis Martes:5;James Hoyt:5;Reymin Guduan:5;Tony Kemp:5;Colin Moran:5;J.D. Davis:5;A.J. Reed:5;David Paulino:5`},

{cat:"Rosters", text:"Name a player on the 2021 Atlanta Braves (World Series champs)", a:`
Freddie Freeman:1;Ronald Acuna Jr.:1;Ozzie Albies:1;Austin Riley:2;Dansby Swanson:2;Max Fried:2;Jorge Soler:2;Charlie Morton:2;Eddie Rosario:3;Joc Pederson:3;Adam Duvall:3;Travis d'Arnaud:3;Ian Anderson:3;Will Smith:3;Marcell Ozuna:3;Tyler Matzek:4;A.J. Minter:4;Luke Jackson:4;Huascar Ynoa:4;Drew Smyly:4;Guillermo Heredia:4;William Contreras:4;Spencer Strider:4;Kyle Wright:4;Pablo Sandoval:4;Orlando Arcia:5;Ehire Adrianza:5;Cristian Pache:5;Ender Inciarte:5;Stephen Vogt:5;Touki Toussaint:5;Chris Martin:5;Jesse Chavez:5;Richard Rodriguez:5;Dylan Lee:5;Tucker Davidson:5;Jacob Webb:5;Josh Tomlin:5;Shane Greene:5;Edgar Santana:5;Abraham Almonte:5;Johan Camargo:5;Bryse Wilson:5;Sean Newcomb:5;Kevan Smith:5`},

{cat:"Rosters", text:"Name a player on the 2019 Washington Nationals (World Series champs)", a:`
Juan Soto:1;Max Scherzer:1;Stephen Strasburg:1;Anthony Rendon:1;Trea Turner:2;Ryan Zimmerman:2;Howie Kendrick:2;Patrick Corbin:2;Adam Eaton:3;Victor Robles:3;Sean Doolittle:3;Daniel Hudson:3;Anibal Sanchez:3;Gerardo Parra:3;Kurt Suzuki:3;Yan Gomes:4;Brian Dozier:4;Asdrubal Cabrera:4;Matt Adams:4;Michael A. Taylor:4|Michael Taylor;Fernando Rodney:4;Tanner Rainey:5;Wander Suero:5;Erick Fedde:5;Joe Ross:5;Austin Voth:5;Javy Guerra:5;Wilmer Difo:5;Carter Kieboom:5;Andrew Stevenson:5;Trevor Rosenthal:5;Kyle Barraclough:5;Tony Sipp:5;Jeremy Hellickson:5;Matt Grace:5;Hunter Strickland:5;Roenis Elias:5;Aaron Barrett:5;Jonny Venters:5;Jake Noll:5`},

{cat:"Rosters", text:"Name a player on the 2015 Kansas City Royals (World Series champs)", a:`
Salvador Perez:1;Eric Hosmer:1;Lorenzo Cain:2;Alex Gordon:2;Mike Moustakas:2;Wade Davis:2;Alcides Escobar:2;Johnny Cueto:3;Yordano Ventura:3;Kendrys Morales:3;Ben Zobrist:3;Greg Holland:3;Kelvin Herrera:3;Edinson Volquez:4;Alex Rios:4;Danny Duffy:4;Jarrod Dyson:4;Chris Young:4;Ryan Madson:4;Luke Hochevar:4;Paulo Orlando:5;Omar Infante:5;Christian Colon:5;Drew Butera:5;Kris Medlen:5;Jeremy Guthrie:5;Terrance Gore:5;Franklin Morales:5;Jason Vargas:5;Joe Blanton:5;Brandon Finnegan:5;Cheslor Cuthbert:5;Jonny Gomes:5;Raul Mondesi:5|Adalberto Mondesi;Yohan Pino:5;Erik Kratz:5;Dusty Coleman:5`},

{cat:"Rosters", text:"Name a player on the 1975 Cincinnati Reds (Big Red Machine)", a:`
Johnny Bench:1;Pete Rose:1;Joe Morgan:1;Tony Perez:2;Ken Griffey Sr.:2|Ken Griffey;George Foster:3;Dave Concepcion:3;Cesar Geronimo:4;Don Gullett:4;Gary Nolan:5;Jack Billingham:5;Fred Norman:5;Pedro Borbon:5;Rawly Eastwick:5;Will McEnaney:5;Clay Carroll:5;Clay Kirby:5;Pat Darcy:5;Merv Rettenmund:5;Dan Driessen:5;Ed Armbrister:5;Darrel Chaney:5;Bill Plummer:5;Terry Crowley:5;Doug Flynn:5;John Vukovich:5;Tom Carroll:5`},

{cat:"Rosters", text:"Name a player on the 2011 St. Louis Cardinals (World Series champs)", a:`
Albert Pujols:1;Yadier Molina:1;David Freese:1;Chris Carpenter:2;Lance Berkman:2;Matt Holliday:2;Allen Craig:3;Jason Motte:3;Rafael Furcal:3;Jon Jay:3;Skip Schumaker:3;Kyle Lohse:4;Jaime Garcia:4;Edwin Jackson:4;Jake Westbrook:4;Lance Lynn:4;Ryan Theriot:4;Nick Punto:4;Daniel Descalso:4;Colby Rasmus:4;Fernando Salas:5;Marc Rzepczynski:5;Octavio Dotel:5;Arthur Rhodes:5;Mitchell Boggs:5;Kyle McClellan:5;Gerald Laird:5;Adron Chambers:5;Tyler Greene:5;Pete Kozma:5;Matt Carpenter:5;Ryan Franklin:5;Miguel Batista:5;Brian Tallet:5;Trever Miller:5;Eduardo Sanchez:5;Corey Patterson:5;Tony Cruz:5;Mark Hamilton:5;Shane Robinson:5`},

/* ---------------------------- MILESTONES ---------------------------- */
{cat:"Milestones", text:"Name a player with 500+ career home runs", a:`
Babe Ruth:1;Hank Aaron:1;Barry Bonds:1;Willie Mays:1;Albert Pujols:1;Alex Rodriguez:1|A-Rod;Ken Griffey Jr.:1;Mickey Mantle:1;Sammy Sosa:1;Mark McGwire:1;David Ortiz:2;Reggie Jackson:2;Manny Ramirez:2;Ted Williams:2;Miguel Cabrera:2;Mike Schmidt:2;Jim Thome:2;Frank Robinson:2;Frank Thomas:3;Harmon Killebrew:3;Ernie Banks:3;Jimmie Foxx:3;Willie McCovey:3;Rafael Palmeiro:3;Eddie Murray:3;Eddie Mathews:4;Gary Sheffield:4;Mel Ott:4`},

{cat:"Milestones", text:"Name a player with 3,000+ career hits", a:`
Pete Rose:1;Derek Jeter:1;Ty Cobb:1;Hank Aaron:1;Tony Gwynn:2;Ichiro Suzuki:2|Ichiro;Stan Musial:2;Willie Mays:2;Cal Ripken Jr.:2;Albert Pujols:2;Miguel Cabrera:2;Alex Rodriguez:2|A-Rod;Roberto Clemente:2;George Brett:3;Wade Boggs:3;Rickey Henderson:3;Craig Biggio:3;Rod Carew:3;Carl Yastrzemski:3|Yaz;Adrian Beltre:3;Paul Molitor:3;Robin Yount:3;Honus Wagner:3;Dave Winfield:4;Lou Brock:4;Eddie Murray:4;Rafael Palmeiro:4;Al Kaline:4;Tris Speaker:4;Nap Lajoie:5;Eddie Collins:5;Cap Anson:5;Paul Waner:5`},

{cat:"Milestones", text:"Name a pitcher with 300+ career wins", a:`
Cy Young:1;Greg Maddux:1;Roger Clemens:1;Nolan Ryan:1;Randy Johnson:2;Walter Johnson:2;Tom Seaver:2;Tom Glavine:2;Warren Spahn:3;Steve Carlton:3;Christy Mathewson:3;Don Sutton:3;Phil Niekro:3;Gaylord Perry:4;Lefty Grove:4;Early Wynn:4;Grover Cleveland Alexander:4|Pete Alexander;Eddie Plank:5;Kid Nichols:5;Pud Galvin:5;Tim Keefe:5;John Clarkson:5;Old Hoss Radbourn:5|Charles Radbourn|Hoss Radbourn;Mickey Welch:5`},

{cat:"Milestones", text:"Name a pitcher with 3,000+ career strikeouts", a:`
Nolan Ryan:1;Randy Johnson:1;Roger Clemens:1;Clayton Kershaw:2;Max Scherzer:2;Justin Verlander:2;Pedro Martinez:2;Greg Maddux:2;Tom Seaver:3;Steve Carlton:3;Bob Gibson:3;Walter Johnson:3;CC Sabathia:3;John Smoltz:3;Curt Schilling:4;Bert Blyleven:4;Don Sutton:4;Gaylord Perry:5;Phil Niekro:5;Fergie Jenkins:5|Ferguson Jenkins`},

{cat:"Milestones", text:"Name a player who hit 50+ home runs in a season (through 2025)", a:`
Aaron Judge:1;Babe Ruth:1;Barry Bonds:1;Mark McGwire:1;Sammy Sosa:1;Shohei Ohtani:1;Roger Maris:2;Ken Griffey Jr.:2;Cal Raleigh:2;Kyle Schwarber:2;Giancarlo Stanton:2;Alex Rodriguez:2|A-Rod;Mickey Mantle:2;Pete Alonso:2;Willie Mays:3;David Ortiz:3;Ryan Howard:3;Jose Bautista:3;Prince Fielder:3;Matt Olson:3;Jim Thome:3;Jimmie Foxx:4;Hank Greenberg:4;Cecil Fielder:4;Albert Belle:4;Chris Davis:4;Andruw Jones:4;Luis Gonzalez:4;Hack Wilson:5;Ralph Kiner:5;Brady Anderson:5;Greg Vaughn:5;George Foster:5;Johnny Mize:5`},

{cat:"Milestones", text:"Name a member of the 40-40 club (40 HR and 40 SB in a season, through 2025)", a:`
Shohei Ohtani:1;Ronald Acuna Jr.:2;Barry Bonds:3;Alex Rodriguez:3|A-Rod;Jose Canseco:4;Alfonso Soriano:5`},

{cat:"Milestones", text:"Name a player who hit 4 home runs in one game (through 2025)", a:`
Lou Gehrig:2;Willie Mays:2;Mike Schmidt:2;Kyle Schwarber:2;J.D. Martinez:3;Josh Hamilton:3;Eugenio Suarez:3;Nick Kurtz:3;Carlos Delgado:4;Shawn Green:4;Scooter Gennett:4;Mark Whiten:4;Mike Cameron:4;Gil Hodges:4;Rocky Colavito:5;Bob Horner:5;Chuck Klein:5;Joe Adcock:5;Ed Delahanty:5;Bobby Lowe:5;Pat Seerey:5`},

{cat:"Milestones", text:"Name a pitcher who threw a perfect game", a:`
Don Larsen:1;Sandy Koufax:1;Roy Halladay:1;Randy Johnson:2;Felix Hernandez:2;David Cone:2;David Wells:2;Cy Young:3;Mark Buehrle:3;Matt Cain:3;Catfish Hunter:3|Jim Hunter;Domingo German:3;Dallas Braden:4;Jim Bunning:4;Kenny Rogers:4;Dennis Martinez:4;Philip Humber:4|Phil Humber;Tom Browning:5;Len Barker:5;Mike Witt:5;Addie Joss:5;Charlie Robertson:5;John Montgomery Ward:5|Monte Ward;Lee Richmond:5`},

{cat:"Milestones", text:"Name a pitcher who threw a solo no-hitter (through 2025)", a:`
Nolan Ryan:1;Sandy Koufax:1;Justin Verlander:1;Max Scherzer:2;Roy Halladay:2;Clayton Kershaw:2;Randy Johnson:2;Don Larsen:2;Johan Santana:2;Felix Hernandez:2;Jake Arrieta:3;David Cone:3;Dwight Gooden:3|Doc Gooden;Cy Young:3;Bob Feller:3;Tim Lincecum:3;Hideo Nomo:3;Jon Lester:3;Mark Buehrle:3;David Wells:3;Bob Gibson:3;Tom Seaver:3;Fernando Valenzuela:3;Jim Abbott:3;Blake Snell:3;Matt Cain:3;Catfish Hunter:3;Cole Hamels:4;Corey Kluber:4;Dock Ellis:4;Jack Morris:4;Kenny Rogers:4;Josh Beckett:4;Bret Saberhagen:4;Jered Weaver:4;Dallas Braden:4;Vida Blue:4;Dave Stewart:4;Edwin Jackson:4;Anibal Sanchez:4;Francisco Liriano:4;Mike Fiers:4;Joe Musgrove:4;Carlos Rodon:4;Domingo German:4;Framber Valdez:4;Dylan Cease:4;Michael Lorenzen:4;Lucas Giolito:4;Ubaldo Jimenez:4;Carlos Zambrano:4;Clay Buchholz:4;Derek Lowe:4;A.J. Burnett:4;Jim Bunning:4;Juan Marichal:4;Warren Spahn:4;Jim Palmer:4;Johnny Vander Meer:4;Dennis Martinez:4;Mike Scott:4;Dave Righetti:4;Homer Bailey:5;Philip Humber:5|Phil Humber;Jordan Zimmermann:5;Henderson Alvarez:5;Matt Garza:5;Chris Heston:5;Alec Mills:5;Wade Miley:5;Spencer Turnbull:5;John Means:5;Reid Detmers:5;Tyler Gilbert:5;Ronel Blanco:5;Kevin Millwood:5;Eric Milton:5;Bud Smith:5;Tom Browning:5;Mike Witt:5;Len Barker:5;Addie Joss:5;Gaylord Perry:5;Bert Blyleven:5;Phil Niekro:5;Jim Maloney:5`},

{cat:"Milestones", text:"Name a closer with 400+ career saves (through 2025)", a:`
Mariano Rivera:1;Trevor Hoffman:2;Kenley Jansen:3;Craig Kimbrel:3;Billy Wagner:4;Lee Smith:4;Francisco Rodriguez:5|K-Rod;John Franco:5`},

{cat:"Milestones", text:"Name a batting Triple Crown winner (AL or NL)", a:`
Miguel Cabrera:1;Mickey Mantle:2;Ted Williams:2;Carl Yastrzemski:2|Yaz;Lou Gehrig:3;Frank Robinson:3;Ty Cobb:3;Rogers Hornsby:4;Jimmie Foxx:4;Joe Medwick:5|Ducky Medwick;Chuck Klein:5;Nap Lajoie:5;Heinie Zimmerman:5;Hugh Duffy:5;Tip O'Neill:5;Paul Hines:5`},

{cat:"Milestones", text:"Name a player who hit .400 in an AL or NL season since 1901", a:`
Ted Williams:1;Ty Cobb:2;Rogers Hornsby:3;Shoeless Joe Jackson:3|Joe Jackson;George Sisler:4;Bill Terry:4;Nap Lajoie:5;Harry Heilmann:5`},

{cat:"Milestones", text:"Name a player with BOTH 3,000 hits and 500 home runs", a:`
Hank Aaron:1;Albert Pujols:1;Willie Mays:2;Alex Rodriguez:2|A-Rod;Miguel Cabrera:2;Eddie Murray:4;Rafael Palmeiro:5`},

/* ------------------------------ AWARDS ------------------------------ */
{cat:"Awards", text:"Name an MVP winner from 2010 to 2025", a:`
Shohei Ohtani:1;Aaron Judge:1;Mike Trout:1;Bryce Harper:1;Mookie Betts:1;Ronald Acuna Jr.:2;Freddie Freeman:2;Miguel Cabrera:2;Jose Altuve:2;Kris Bryant:2;Giancarlo Stanton:2;Clayton Kershaw:2;Paul Goldschmidt:3;Christian Yelich:3;Cody Bellinger:3;Buster Posey:3;Justin Verlander:3;Joey Votto:3;Andrew McCutchen:3;Josh Donaldson:4;Ryan Braun:4;Josh Hamilton:4;Jose Abreu:5`},

{cat:"Awards", text:"Name an MVP winner from 1990 to 2009", a:`
Barry Bonds:1;Ken Griffey Jr.:1;Alex Rodriguez:1|A-Rod;Albert Pujols:1;Sammy Sosa:2;Frank Thomas:2;Ichiro Suzuki:2|Ichiro;Chipper Jones:2;Cal Ripken Jr.:2;Rickey Henderson:3;Ivan Rodriguez:3|Pudge Rodriguez|Pudge;Jeff Bagwell:3;Vladimir Guerrero:3;Dustin Pedroia:3;Joe Mauer:3;Ryan Howard:3;Jimmy Rollins:3;Jason Giambi:3;Juan Gonzalez:4;Larry Walker:4;Barry Larkin:4;Miguel Tejada:4;Mo Vaughn:4;Jeff Kent:4;Justin Morneau:4;Dennis Eckersley:4;Ken Caminiti:5;Terry Pendleton:5`},

{cat:"Awards", text:"Name a Cy Young Award winner from 2010 to 2025", a:`
Clayton Kershaw:1;Justin Verlander:1;Max Scherzer:1;Jacob deGrom:1;Gerrit Cole:2;Tarik Skubal:2;Paul Skenes:2;Blake Snell:2;Roy Halladay:2;Felix Hernandez:2;Chris Sale:3;Corey Kluber:3;Sandy Alcantara:3;Corbin Burnes:3;Shane Bieber:3;Jake Arrieta:3;David Price:3;Trevor Bauer:4;Robbie Ray:4;Dallas Keuchel:4;R.A. Dickey:4;Rick Porcello:5`},

{cat:"Awards", text:"Name a Rookie of the Year from 2010 to 2025", a:`
Mike Trout:1;Bryce Harper:1;Aaron Judge:1;Shohei Ohtani:1;Paul Skenes:2;Ronald Acuna Jr.:2;Pete Alonso:2;Julio Rodriguez:2;Buster Posey:2;Jacob deGrom:2;Kris Bryant:2;Corey Seager:3;Cody Bellinger:3;Carlos Correa:3;Yordan Alvarez:3;Gunnar Henderson:3;Corbin Carroll:3;Nick Kurtz:3;Jose Fernandez:3;Craig Kimbrel:3;Luis Gil:4;Jose Abreu:4;Randy Arozarena:4;Michael Harris II:4|Michael Harris;Drake Baldwin:4;Jonathan India:4;Devin Williams:4;Wil Myers:5;Kyle Lewis:5;Michael Fulmer:5;Jeremy Hellickson:5;Neftali Feliz:5`},

{cat:"Awards", text:"Name a World Series MVP from 2000 to 2026", a:`
Derek Jeter:1;David Ortiz:1|Big Papi;Madison Bumgarner:1;Freddie Freeman:1;Yoshinobu Yamamoto:2;Corey Seager:2;Manny Ramirez:2;Randy Johnson:2;Curt Schilling:2;William Contreras:2;George Springer:3;Stephen Strasburg:3;Hideki Matsui:3;Cole Hamels:3;Salvador Perez:3;Ben Zobrist:3;David Freese:3;Pablo Sandoval:3;Jorge Soler:4;Jeremy Pena:4;Josh Beckett:4;Mike Lowell:4;Troy Glaus:5;Jermaine Dye:5;David Eckstein:5;Edgar Renteria:5;Steve Pearce:5`},

{cat:"Awards", text:"Name a pitcher with 3 or more Cy Young Awards", a:`
Roger Clemens:1;Randy Johnson:1;Greg Maddux:1;Clayton Kershaw:2;Pedro Martinez:2;Max Scherzer:2;Justin Verlander:2;Sandy Koufax:3;Tom Seaver:3;Steve Carlton:4;Jim Palmer:5`},

{cat:"Awards", text:"Name a pitcher who won the Cy Young and MVP in the same season", a:`
Justin Verlander:1;Clayton Kershaw:1;Roger Clemens:2;Bob Gibson:2;Sandy Koufax:2;Dennis Eckersley:3;Denny McLain:4;Vida Blue:4;Rollie Fingers:4;Don Newcombe:5;Willie Hernandez:5|Guillermo Hernandez`},

{cat:"Awards", text:"Name a player who has won a Gold Glove at shortstop", a:`
Ozzie Smith:1;Derek Jeter:1;Francisco Lindor:1;Omar Vizquel:2;Cal Ripken Jr.:2;Bobby Witt Jr.:2;Alex Rodriguez:2|A-Rod;Dansby Swanson:3;Andrelton Simmons:3;Brandon Crawford:3;Barry Larkin:3;Troy Tulowitzki:3;Jimmy Rollins:3;Carlos Correa:3;Jeremy Pena:3;Anthony Volpe:3;Alan Trammell:3;Javier Baez:4|Javy Baez;Masyn Winn:4;Luis Aparicio:4;Mark Belanger:4;Dave Concepcion:4;J.J. Hardy:4;Edgar Renteria:4;Rey Ordonez:4;Orlando Cabrera:4;Tony Fernandez:4;J.P. Crawford:4;Michael Young:4;Larry Bowa:4;Maury Wills:4;Bud Harrelson:4;Ozzie Guillen:4;Nick Ahmed:5;Ezequiel Tovar:5;Alcides Escobar:5;Erick Aybar:5;Cesar Izturis:5;Neifi Perez:5;Jay Bell:5;Alfredo Griffin:5;Don Kessinger:5;Zoilo Versalles:5;Gene Alley:5;Roy McMillan:5`},

{cat:"Awards", text:"Name a Home Run Derby champion (1985-2026)", a:`
Pete Alonso:1;Aaron Judge:1;Ken Griffey Jr.:1;Bryce Harper:2;Giancarlo Stanton:2;Juan Soto:2;Vladimir Guerrero Jr.:2|Vlad Jr.|Vlad Guerrero Jr.;Cal Raleigh:2;Mark McGwire:2;Sammy Sosa:2;Barry Bonds:2;David Ortiz:3;Prince Fielder:3;Teoscar Hernandez:3;Jordan Walker:3;Yoenis Cespedes:3;Robinson Cano:3;Todd Frazier:3;Ryan Howard:3;Cal Ripken Jr.:3;Frank Thomas:3;Vladimir Guerrero:3|Vladimir Guerrero Sr.;Jason Giambi:4;Bobby Abreu:4;Justin Morneau:4;Darryl Strawberry:4;Luis Gonzalez:4;Miguel Tejada:4;Juan Gonzalez:4;Ryne Sandberg:4;Tino Martinez:5;Garret Anderson:5;Andre Dawson:5;Dave Parker:5;Eric Davis:5;Ruben Sierra:5;Wally Joyner:5`},

{cat:"Awards", text:"Name a #1 overall pick in the MLB Draft (1965-2025)", a:`
Bryce Harper:1;Ken Griffey Jr.:1;Alex Rodriguez:1|A-Rod;Paul Skenes:1;Stephen Strasburg:2;Chipper Jones:2;Gerrit Cole:2;Carlos Correa:2;Joe Mauer:2;Jackson Holliday:2;Adley Rutschman:2;Dansby Swanson:3;David Price:3;Darryl Strawberry:3;Josh Hamilton:3;Justin Upton:3;Adrian Gonzalez:3;Spencer Torkelson:3;Royce Lewis:3;Casey Mize:3;Travis Bazzana:4;Mickey Moniak:4;Henry Davis:4;Pat Burrell:4;Harold Baines:4;Delmon Young:4;Mark Appel:4;Eli Willits:4;Tim Beckham:4;Luke Hochevar:5;Matt Bush:5;Brady Aiken:5;Darin Erstad:5;Kris Benson:5;Phil Nevin:5;Ben McDonald:5;Andy Benes:5;B.J. Surhoff:5;Bob Horner:5;Rick Monday:5;Brien Taylor:5;Bryan Bullington:5;Matt Anderson:5;Paul Wilson:5;Shawon Dunston:5;Jeff King:5`},

/* ---------------------------- COOPERSTOWN ---------------------------- */
{cat:"Cooperstown", text:"Name a Hall of Fame pitcher", a:`
Nolan Ryan:1;Sandy Koufax:1;Greg Maddux:1;Randy Johnson:1;Pedro Martinez:1;Mariano Rivera:1;Cy Young:1;Tom Seaver:2;Bob Gibson:2;Tom Glavine:2;John Smoltz:2;Whitey Ford:2;Roy Halladay:2;Walter Johnson:2;CC Sabathia:2;Steve Carlton:3;Jim Palmer:3;Warren Spahn:3;Bob Feller:3;Satchel Paige:3;Christy Mathewson:3;Mike Mussina:3;Trevor Hoffman:3;Dennis Eckersley:3;Catfish Hunter:3|Jim Hunter;Don Drysdale:3;Juan Marichal:3;Fergie Jenkins:3|Ferguson Jenkins;Goose Gossage:3|Rich Gossage;Rollie Fingers:3;Jack Morris:3;Phil Niekro:3;Gaylord Perry:3;Bert Blyleven:3;Don Sutton:3;Dizzy Dean:3;Lefty Grove:4;Robin Roberts:4;Billy Wagner:4;Lee Smith:4;Bruce Sutter:4;Jim Bunning:4;Jim Kaat:4;Carl Hubbell:4;Grover Cleveland Alexander:4|Pete Alexander;Lefty Gomez:4;Bob Lemon:4;Mordecai Brown:4|Three Finger Brown;Hoyt Wilhelm:5;Early Wynn:5;Hal Newhouser:5;Red Ruffing:5;Rube Waddell:5;Eppa Rixey:5;Stan Coveleski:5;Burleigh Grimes:5;Addie Joss:5;Dazzy Vance:5;Ted Lyons:5;Kid Nichols:5;Pud Galvin:5;Amos Rusie:5;Ed Walsh:5;Chief Bender:5;Rube Marquard:5;Waite Hoyt:5;Herb Pennock:5;Red Faber:5;Jesse Haines:5;Eddie Plank:5;Joe McGinnity:5;Jack Chesbro:5;Vic Willis:5;Tim Keefe:5;John Clarkson:5;Mickey Welch:5;Old Hoss Radbourn:5|Charles Radbourn|Hoss Radbourn;Bullet Rogan:5;Smokey Joe Williams:5|Joe Williams;Leon Day:5;Hilton Smith:5;Bill Foster:5|Willie Foster;Jose Mendez:5;Ray Brown:5;Andy Cooper:5;Martin Dihigo:5`},

{cat:"Cooperstown", text:"Name a Hall of Fame catcher", a:`
Johnny Bench:1;Yogi Berra:1;Mike Piazza:1;Ivan Rodriguez:2|Pudge Rodriguez|Pudge;Carlton Fisk:2;Gary Carter:2;Joe Mauer:2;Roy Campanella:3;Josh Gibson:3;Bill Dickey:4;Mickey Cochrane:4;Ted Simmons:4;Gabby Hartnett:5;Ernie Lombardi:5;Buck Ewing:5;Roger Bresnahan:5;Ray Schalk:5;Rick Ferrell:5;Biz Mackey:5;Louis Santop:5`},

{cat:"Cooperstown", text:"Name a Hall of Fame shortstop", a:`
Derek Jeter:1;Cal Ripken Jr.:1;Ozzie Smith:1;Honus Wagner:2;Ernie Banks:2;Barry Larkin:2;Robin Yount:3;Alan Trammell:3;Pee Wee Reese:3;Phil Rizzuto:3;Luis Aparicio:4;Lou Boudreau:4;Joe Cronin:4;Luke Appling:5;Arky Vaughan:5;Rabbit Maranville:5;Joe Tinker:5;Joe Sewell:5;Travis Jackson:5;Dave Bancroft:5;Bobby Wallace:5;Hughie Jennings:5;George Davis:5;John Montgomery Ward:5|Monte Ward;George Wright:5;Willie Wells:5;Pop Lloyd:5|John Henry Lloyd`},

{cat:"Cooperstown", text:"Name a Hall of Fame second baseman", a:`
Jackie Robinson:1;Joe Morgan:1;Ryne Sandberg:2;Roberto Alomar:2;Craig Biggio:2;Rod Carew:3;Rogers Hornsby:3;Jeff Kent:3;Bill Mazeroski:4;Eddie Collins:4;Nap Lajoie:4;Charlie Gehringer:4;Nellie Fox:4;Frankie Frisch:5;Bobby Doerr:5;Tony Lazzeri:5;Red Schoendienst:5;Joe Gordon:5;Billy Herman:5;Johnny Evers:5;Bid McPhee:5;Frank Grant:5`},

{cat:"Cooperstown", text:"Name a Hall of Fame third baseman", a:`
Mike Schmidt:1;Chipper Jones:1;George Brett:1;Wade Boggs:2;Brooks Robinson:2;Adrian Beltre:2;Scott Rolen:3;Eddie Mathews:3;Ron Santo:3;Paul Molitor:4;Dick Allen:4;Harmon Killebrew:4;Pie Traynor:4;George Kell:5;Home Run Baker:5|Frank Baker;Jimmy Collins:5;Freddie Lindstrom:5;Ray Dandridge:5;Judy Johnson:5;Jud Wilson:5;Deacon White:5`},

{cat:"Cooperstown", text:"Name a Hall of Fame first baseman", a:`
Lou Gehrig:1;Frank Thomas:2;Jim Thome:2;Jeff Bagwell:2;Jimmie Foxx:2;Willie McCovey:3;Eddie Murray:3;Todd Helton:3;Fred McGriff:3;Harmon Killebrew:3;Hank Greenberg:3;Tony Perez:4;Orlando Cepeda:4;Gil Hodges:4;Ernie Banks:4;Rod Carew:4;Dick Allen:4;Johnny Mize:4;George Sisler:5;Bill Terry:5;Cap Anson:5;Jim Bottomley:5;Frank Chance:5;Dan Brouthers:5;Roger Connor:5;Jake Beckley:5;George Kelly:5|High Pockets Kelly;Buck Leonard:5;Mule Suttles:5;Ben Taylor:5`},

{cat:"Cooperstown", text:"Name a player inducted into the Hall of Fame in the classes of 2015-2026", a:`
Derek Jeter:1;Ken Griffey Jr.:1;Mariano Rivera:1;David Ortiz:1|Big Papi;Ichiro Suzuki:1|Ichiro;Chipper Jones:2;Randy Johnson:2;Pedro Martinez:2;Mike Piazza:2;CC Sabathia:2;Adrian Beltre:2;Carlos Beltran:2;Joe Mauer:2;Roy Halladay:3;Jim Thome:3;Vladimir Guerrero:3;Ivan Rodriguez:3|Pudge Rodriguez|Pudge;John Smoltz:3;Craig Biggio:3;Jeff Bagwell:3;Andruw Jones:3;Todd Helton:3;Scott Rolen:3;Edgar Martinez:3;Trevor Hoffman:3;Mike Mussina:3;Larry Walker:4;Billy Wagner:4;Tim Raines:4;Fred McGriff:4;Jeff Kent:4;Alan Trammell:4;Jack Morris:4;Lee Smith:4;Dick Allen:4;Dave Parker:4;Gil Hodges:4;Ted Simmons:5;Harold Baines:5;Jim Kaat:5;Tony Oliva:5;Minnie Minoso:5;Buck O'Neil:5;Bud Fowler:5`},

{cat:"Cooperstown", text:"Name a Hall of Famer who played for the St. Louis Cardinals", a:`
Stan Musial:1;Ozzie Smith:1;Bob Gibson:1;Lou Brock:2;Rogers Hornsby:2;Dizzy Dean:2;Scott Rolen:3;Red Schoendienst:3;Enos Slaughter:3;Ted Simmons:3;Steve Carlton:3;Bruce Sutter:3;Dennis Eckersley:4;Orlando Cepeda:4;Larry Walker:4;Frankie Frisch:4;Johnny Mize:4;Joe Medwick:4|Ducky Medwick;Lee Smith:4;Jim Bottomley:5;Jesse Haines:5;Chick Hafey:5;Jim Kaat:5;John Smoltz:5;Grover Cleveland Alexander:5|Pete Alexander;Cy Young:5;Hoyt Wilhelm:5;Minnie Minoso:5;Dick Allen:5;Burleigh Grimes:5;Dazzy Vance:5;Rabbit Maranville:5;Roger Bresnahan:5;Mordecai Brown:5|Three Finger Brown;Kid Nichols:5;Jesse Burkett:5;Bobby Wallace:5;Jake Beckley:5;Vic Willis:5`},

/* ---------------------------- BIRTHPLACES ---------------------------- */
{cat:"Birthplaces", text:"Name a Japanese-born MLB player", a:`
Shohei Ohtani:1|Shohei;Ichiro Suzuki:1|Ichiro;Yoshinobu Yamamoto:1;Yu Darvish:1;Hideki Matsui:2;Hideo Nomo:2;Masahiro Tanaka:2;Roki Sasaki:2;Kodai Senga:2;Seiya Suzuki:2;Shota Imanaga:2;Daisuke Matsuzaka:2|Dice-K;Munetaka Murakami:3;Kenta Maeda:3;Masataka Yoshida:3;Yusei Kikuchi:3;Koji Uehara:3;Hideki Irabu:3;Hiroki Kuroda:4;Hisashi Iwakuma:4;Kazuhiro Sasaki:4;Kazuo Matsui:4|Kaz Matsui;Kosuke Fukudome:4;Norichika Aoki:4|Nori Aoki;Tomoyuki Sugano:4;Kazuma Okamoto:4;Tatsuya Imai:4;Yuki Matsui:4;Shintaro Fujinami:4;Tadahito Iguchi:4;Kenji Johjima:4;Tsuyoshi Shinjo:4;So Taguchi:4;Yoshitomo Tsutsugo:4;Junichi Tazawa:5;Munenori Kawasaki:5;Tomo Ohka:5;Shigetoshi Hasegawa:5;Akinori Iwamura:5;Takashi Saito:5;Kazuhisa Ishii:5;Hideki Okajima:5;Ryota Igarashi:5;Shingo Takatsu:5;Mac Suzuki:5;Tsuyoshi Wada:5;Kei Igawa:5;Akinori Otsuka:5;Shogo Akiyama:5;Masanori Murakami:5;Dave Roberts:5`},

{cat:"Birthplaces", text:"Name a Dominican-born MLB player", a:`
David Ortiz:1|Big Papi;Pedro Martinez:1;Juan Soto:1;Albert Pujols:1;Sammy Sosa:1;Fernando Tatis Jr.:1;Manny Ramirez:1;Rafael Devers:2;Vladimir Guerrero:2|Vladimir Guerrero Sr.;Julio Rodriguez:2;Jose Ramirez:2;Elly De La Cruz:2;Robinson Cano:2;Adrian Beltre:2;Bartolo Colon:2;Jose Reyes:2;Nelson Cruz:2;Alfonso Soriano:2;Juan Marichal:3;Sandy Alcantara:3;Starling Marte:3;Teoscar Hernandez:3;Ketel Marte:3;Jose Bautista:3;Edwin Encarnacion:3;Miguel Tejada:3;Hanley Ramirez:3;Aramis Ramirez:3;Marcell Ozuna:3;Gary Sanchez:3;Framber Valdez:3;Luis Severino:3;Johnny Cueto:3;Oneil Cruz:3;Junior Caminero:3;Jeremy Pena:3;Freddy Peralta:3;Willy Adames:3;Carlos Santana:3;Eloy Jimenez:4;Rafael Furcal:4;Julio Franco:4;Luis Castillo:4;Jhoan Duran:4;Cristopher Sanchez:4;Jean Segura:4;Jorge Polanco:4;Amed Rosario:4;Jeimer Candelario:4;Cristian Javier:4;Raul Mondesi:4;Placido Polanco:4;Carlos Gomez:4;Ervin Santana:4;Francisco Liriano:4;Jose Rijo:4;Ramon Martinez:4;Tony Fernandez:4;George Bell:4;Pedro Guerrero:4;Felipe Alou:4;Tony Pena:4;Geraldo Perdomo:4;Yainer Diaz:4;Pedro Strop:5;Joaquin Andujar:5;Cesar Cedeno:5;Rico Carty:5;Ozzie Virgil:5`},

{cat:"Birthplaces", text:"Name a Venezuelan-born MLB player", a:`
Miguel Cabrera:1;Jose Altuve:1;Ronald Acuna Jr.:1;Salvador Perez:2;Felix Hernandez:2;Johan Santana:2;Luis Arraez:2;Jackson Chourio:2;William Contreras:2;Willson Contreras:2;Gleyber Torres:2;Eugenio Suarez:2;Omar Vizquel:3;Bobby Abreu:3;Andres Galarraga:3;Magglio Ordonez:3;Victor Martinez:3;Carlos Gonzalez:3;Pablo Sandoval:3;Francisco Rodriguez:3|K-Rod;Carlos Zambrano:3;Andres Gimenez:3;Ranger Suarez:3;Pablo Lopez:3;Anthony Santander:3;Elvis Andrus:3;Luis Aparicio:4;Dave Concepcion:4;Ozzie Guillen:4;Carlos Carrasco:4;Freddy Garcia:4;Asdrubal Cabrera:4;Eduardo Escobar:4;Alcides Escobar:4;Carlos Guillen:4;Ezequiel Tovar:4;Wilyer Abreu:4;Maikel Garcia:4;German Marquez:4;Rougned Odor:4;Avisail Garcia:4;Martin Prado:4;Marco Scutaro:5;Edgardo Alfonzo:5;Melvin Mora:5;Richard Hidalgo:5;Tony Armas:5;Ugueth Urbina:5;Kelvim Escobar:5;Anibal Sanchez:5;Wilson Ramos:5;Cesar Hernandez:5`},

{cat:"Birthplaces", text:"Name a Puerto Rico-born MLB player", a:`
Roberto Clemente:1;Francisco Lindor:1;Carlos Correa:1;Javier Baez:1|Javy Baez;Yadier Molina:1;Carlos Beltran:2;Ivan Rodriguez:2|Pudge Rodriguez|Pudge;Edwin Diaz:2;Bernie Williams:2;Jorge Posada:2;Roberto Alomar:2;Carlos Delgado:3;Kike Hernandez:3|Enrique Hernandez;Jose Berrios:3;Juan Gonzalez:3;Orlando Cepeda:3;Eddie Rosario:3;Sandy Alomar Jr.:3;Christian Vazquez:4;Martin Maldonado:4;Heliot Ramos:4;Javier Vazquez:4;Ruben Sierra:4;Carlos Baerga:4;Benito Santiago:4;Bengie Molina:4;Jose Molina:5;Jose Cruz:5;Mike Lowell:5;Jose Valentin:5;Juan Pizarro:5;Willie Hernandez:5|Guillermo Hernandez;Sixto Lezcano:5;Jose Vidro:5;Angel Pagan:5;Alex Cora:5;Joey Cora:5;Geovany Soto:5;Emmanuel Rivera:5`},

{cat:"Birthplaces", text:"Name a Cuban-born MLB player", a:`
Yordan Alvarez:1;Aroldis Chapman:1;Jose Abreu:1;Yasiel Puig:1;Yoenis Cespedes:1;Randy Arozarena:2;Jose Canseco:2;Luis Robert Jr.:2|Luis Robert;Adolis Garcia:2;Yuli Gurriel:2;Jorge Soler:2;Yoan Moncada:2;Tony Perez:3;Luis Tiant:3;Rafael Palmeiro:3;Jose Fernandez:3;Lourdes Gurriel Jr.:3;Yandy Diaz:3;Orlando Hernandez:3|El Duque;Livan Hernandez:3;Tony Oliva:3;Minnie Minoso:3;Andy Pages:3;Nestor Cortes:3;Kendrys Morales:4;Yasmani Grandal:4;Jose Iglesias:4;Raisel Iglesias:4;Alexei Ramirez:4;Jose Contreras:4;Bert Campaneris:4;Rey Ordonez:4;Mike Cuellar:4;Yunel Escobar:5;Leonys Martin:5;Aledmys Diaz:5;Yasmany Tomas:5;Camilo Pascual:5;Tony Taylor:5;Zoilo Versalles:5;Cookie Rojas:5;Dolf Luque:5`},

{cat:"Birthplaces", text:"Name a Canadian-born MLB player", a:`
Joey Votto:1;Vladimir Guerrero Jr.:1|Vlad Jr.|Vlad Guerrero Jr.;Larry Walker:2;Josh Naylor:2;Justin Morneau:2;Russell Martin:2;Fergie Jenkins:3|Ferguson Jenkins;Jason Bay:3;Eric Gagne:3;James Paxton:3;Tyler O'Neill:3;Bo Naylor:3;Jordan Romano:3;Nick Pivetta:3;Brett Lawrie:4;Matt Stairs:4;Ryan Dempster:4;Michael Soroka:4|Mike Soroka;Cal Quantrill:4;John Axford:4;Rich Harden:4;Erik Bedard:4;Jeff Francis:4;Corey Koskie:4;Michael Saunders:4;Edouard Julien:5;Abraham Toro:5;Zach Pop:5;Paul Quantrill:5;Terry Puhl:5;Owen Caissie:5;Denzel Clarke:5;George Selkirk:5;Jeff Heath:5;Tip O'Neill:5`},

/* ---------------------------- TWO UNIFORMS ---------------------------- */
{cat:"Two Uniforms", text:"Name a player who played for BOTH the Yankees and the Red Sox", a:`
Babe Ruth:1;Johnny Damon:1;Roger Clemens:1;Wade Boggs:2;Jacoby Ellsbury:2;Alex Verdugo:2;Aroldis Chapman:3;Kevin Youkilis:3;David Wells:3;Rickey Henderson:3;Jose Canseco:3;Andrew Miller:3;Nathan Eovaldi:3;Luis Tiant:3;David Cone:4;Sparky Lyle:4;Bartolo Colon:4;Derek Lowe:4;Mike Lowell:4;Adam Ottavino:4;Stephen Drew:4;Don Baylor:4;Lee Smith:4;John Olerud:4;Tom Gordon:4;Mark Bellhorn:4;Doug Mientkiewicz:4;Mike Stanley:4;Eduardo Nunez:4;Elston Howard:4;Red Ruffing:5;Herb Pennock:5;Waite Hoyt:5;Carl Mays:5;Mike Torrez:5;Jeff Reardon:5;Alfredo Aceves:5;Ramiro Mendoza:5;Alan Embree:5;Mike Myers:5;Tony Clark:5`},

{cat:"Two Uniforms", text:"Name a player who played for BOTH the Mets and the Yankees", a:`
Juan Soto:1;Darryl Strawberry:1;Dwight Gooden:1|Doc Gooden;David Cone:2;Carlos Beltran:2;Curtis Granderson:2;Robinson Cano:2;Luis Severino:2;Clay Holmes:2;Rickey Henderson:3;Bartolo Colon:3;Gary Sheffield:3;Al Leiter:3;Orlando Hernandez:3|El Duque;Yogi Berra:3;Devin Williams:3;David Robertson:3;Harrison Bader:3;Marcus Stroman:3;Todd Frazier:3;Robin Ventura:3;Willie Randolph:3;John Olerud:4;Todd Zeile:4;Mike Stanton:4;Kenny Rogers:4;Lee Mazzilli:4;Dave Kingman:4;Jose Vizcaino:4;Neil Walker:4;Adam Ottavino:4;Dellin Betances:4;Jay Bruce:4;Armando Benitez:4;Luke Weaver:4;Frankie Montas:4;Marv Throneberry:4;Jesse Orosco:5;Tony Clark:5;Chasen Shreve:5;LaTroy Hawkins:5;Ike Davis:5;Kelly Johnson:5;Ralph Terry:5;Gene Woodling:5;Phil Linz:5;Dock Ellis:5;Rafael Santana:5;Rick Cerone:5;Miguel Cairo:5;Octavio Dotel:5;Ron Swoboda:5`},

{cat:"Two Uniforms", team:true, text:"Name a team Rickey Henderson played for", a:`
Athletics:1;Yankees:1;Mets:3;Padres:3;Blue Jays:3;Red Sox:4;Dodgers:4;Mariners:5;Angels:5`},

{cat:"Two Uniforms", team:true, text:"Name a team Edwin Jackson pitched for (he holds the record with 14)", a:`
Cubs:2;Diamondbacks:2;Tigers:3;White Sox:3;Nationals:3;Dodgers:3;Rays:3;Cardinals:3;Athletics:4;Blue Jays:4;Braves:4;Marlins:5;Padres:5;Orioles:5`},

{cat:"Two Uniforms", team:true, text:"Name a team Bartolo Colon pitched for", a:`
Mets:1;Guardians=Cleveland Indians:2;Angels:2;Yankees:3;Athletics:3;Braves:3;Rangers:4;White Sox:4;Twins:4;Red Sox:5;Nationals=Montreal Expos:5`},

/* ----------------------------- FRANCHISES ----------------------------- */
{cat:"Franchises", team:true, text:"Name a franchise that has won the World Series", a:`
Yankees:1;Dodgers:1;Red Sox:1;Cardinals:1;Giants:1;Cubs:1;Astros:1;Braves:1;Brewers:2;Phillies:2;Mets:2;Royals:2;Rangers:2;Nationals:2;Reds:3;Athletics:3;Tigers:3;Pirates:3;Orioles:3;Twins:3;Marlins:3;Blue Jays:3;White Sox:3;Diamondbacks:4;Angels:4;Guardians:4`},

{cat:"Franchises", team:true, text:"Name a current MLB team that has NEVER won a World Series", a:`
Mariners:2;Padres:2;Rockies:3;Rays:3`},

{cat:"Franchises", team:true, text:"Name a team that LOST a World Series between 2010 and 2026", a:`
Yankees:2;Dodgers:2;Blue Jays:2;Rays:2;Astros:2;Phillies:2;Mets:3;Rangers:3;Diamondbacks:3;Guardians:3;Royals:4;Cardinals:4;Tigers:5`},

{cat:"Franchises", team:true, text:"Name an expansion team (a franchise that started in 1961 or later)", a:`
Diamondbacks:1;Rays:1;Rockies:1;Marlins:1;Mets:2;Blue Jays:2;Mariners:2;Nationals:3;Royals:3;Padres:3;Astros:3;Angels:4;Brewers:4;Rangers:4`},

{cat:"Franchises", team:true, text:"Name a franchise that has relocated to a different city", a:`
Athletics:1;Dodgers:1;Giants:1;Nationals:2;Braves:2;Twins:3;Rangers:3;Orioles:4;Brewers:4`},

{cat:"Franchises", text:"Name a manager who won a World Series from 2000 to 2026", a:`
Dave Roberts:1;Joe Torre:1;Terry Francona:1|Tito Francona;Bruce Bochy:1;Dusty Baker:2;Joe Maddon:2;Alex Cora:2;Tony La Russa:2;Brian Snitker:3;Pat Murphy:3;A.J. Hinch:3;Joe Girardi:3;Dave Martinez:3|Davey Martinez;Charlie Manuel:3;Ned Yost:4;Ozzie Guillen:4;Mike Scioscia:4;John Farrell:4;Jack McKeon:5;Bob Brenly:5`},

/* ------------------------------ NEW YORK ------------------------------ */
{cat:"New York", text:"Name a player or manager whose number is retired by the Yankees", a:`
Derek Jeter:1;Babe Ruth:1;Mickey Mantle:1;Lou Gehrig:1;Joe DiMaggio:1;Mariano Rivera:1;Yogi Berra:2;Don Mattingly:2;Reggie Jackson:2;Bernie Williams:2;Jorge Posada:2;Andy Pettitte:2;Paul O'Neill:3;Thurman Munson:3;Whitey Ford:3;Roger Maris:3;CC Sabathia:3;Joe Torre:3;Phil Rizzuto:4;Ron Guidry:4;Billy Martin:4;Casey Stengel:4;Elston Howard:5;Bill Dickey:5;Jackie Robinson:5`},

{cat:"New York", text:"Name a Yankees captain", a:`
Derek Jeter:1;Aaron Judge:1;Thurman Munson:2;Don Mattingly:2;Lou Gehrig:3;Babe Ruth:4;Ron Guidry:4;Willie Randolph:4;Graig Nettles:4;Roger Peckinpaugh:5;Everett Scott:5;Hal Chase:5`},

{cat:"New York", text:"Name a Yankee who hit 50+ home runs in a season (through 2025)", a:`
Aaron Judge:1;Babe Ruth:1;Roger Maris:2;Mickey Mantle:3;Alex Rodriguez:4|A-Rod`},

{cat:"New York", text:"Name a pitcher who won 20 games in a season for the Mets", a:`
Tom Seaver:1;Dwight Gooden:2|Doc Gooden;R.A. Dickey:3;David Cone:3;Jerry Koosman:4;Frank Viola:5`},

{cat:"New York", text:"Name a Met who hit 40+ home runs in a season", a:`
Pete Alonso:1;Juan Soto:2;Mike Piazza:3;Carlos Beltran:3;Todd Hundley:5`}

];
