-- SQLBook: Code
BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

-- Vider les tables (TRUNCATE remet les ID à zéro aussi)
TRUNCATE TABLE utilisateur_interagit_livre, livre, utilisateur RESTART IDENTITY CASCADE;

-- Insertion livres
INSERT INTO livre (ISBN, titre, auteur, date_publication, nombre_page, summary) VALUES
('9782070584628', 'Harry Potter à l''école des sorciers', 'J. K. Rowling', 'Nov 15, 2017', 300, 'Mr et Mrs Dursley, qui habitaient au 4, Privet Drive, avaient toujours affirmé avec la plus grande fierté qu’ils étaient parfaitement normaux, merci pour eux. Jamais quiconque n’aurait imaginé qu’ils puissent se trouver impliqués dans quoi que ce soit d’étrange ou de mystérieux. Ils n’avaient pas de temps à perdre avec des sornettes.'),
('9782747014403', 'Eragon', 'Christopher Paolini', 'Oct 01, 2004', 450, 'Un résumé captivant.'),
('9782090318845', 'Le Comte De Monte-Cristo', 'Alexandre Dumas', '1909', 450, 'LE 24 FEVRIER 1815, la vigie de Notre-Dame-de-la-Garde signale l''arrivee du trois-mats le Pharaon, venant de Smyrne, Trieste et Naples.'),
('9782277124344', 'Un bonheur insoutenable', 'Ira Levin', '1978-12-05', 384, 'Gouvernés par un ordinateur géant, les hommes sont à l''aide d''un traitement hormonal mensuel adéquat - uniformisés, privés de toute pensée originale. Dans un univers où il n''existe que quatre prénoms différents pour chaque sexe, le jeune Li RM35M4419, surnommé Copeau va vivre une odyssée qui va l''amener d''abord à s''accepter en tant qu''individu, puis à la révolte.'),
('9782843440984', 'La maison qui glissait', 'Jean-Pierre Andrevon', '25-05-2010', 528, 'Un immense fracas le réveille. Le tonnerre ? Peut-être… Le jour pointe, la chaleur est déjà étouffante dans l’appartement minuscule occupé par Pierre au 13e étage de sa tour de banlieue. Ensommeillé, il entrouvre le rideau de la fenêtre depuis son lit… et demeure pétrifié par le panorama qui se révèle à lui. Un brouillard poisseux bouche l’horizon, c’est à peine s’il distingue la silhouette de la tour des Tilleuls à quelques dizaines de mètres de là. Le brouillard, avec une telle canicule ?... Ainsi débute le cauchemar'),
('9782266320481', 'Dune', 'Franck Herbert', '01-01-2003', 928, 'Situé sur la planète désertique Arrakis, Dune raconte l''histoire du jeune Paul Atréides, héritier d''une famille noble chargée de gouverner un monde inhospitalier où la seule chose de valeur est le mélange « épice », une drogue capable de prolonger la vie et d''améliorer la conscience. Convoité dans tout l''univers connu, le mélange est un trésor qui vaut la peine de tuer…'),
('9782070408504', ' Le petit prince', 'Antoine de Saint-Exupéry', '25-05-2017', 106, 'Le Petit Prince est l''œuvre la plus connue d''Antoine de Saint-Exupéry. Publiée en 1943 à New York simultanément à sa traduction anglaise, c''est une œuvre poétique et philosophique sous l''apparence d''un conte pour enfants.'),
('9782070345830', 'Notre Dame de Paris', 'Victor Hugo', '01-03-2009', 960, 'Histoire d''amour impossible entre la belle gitane Esméralda et plusieurs personnages, notamment le bossu Quasimodo, sonneur de cloches de Notre-Dame, et l''archidiacre Claude Frollo. Ce dernier, tiraillé par une passion destructrice pour Esméralda, la fera accuser à tort de meurtre et la mènera à sa perte.'),
('9782298027259', 'Hunger Games', 'Suzanne Collins', '01-04-2012', 399, 'Roman dystopique, l''histoire est écrite du point de vue de Katniss Everdeen, 16 ans, qui vit dans la future nation post-apocalyptique de Panem, en Amérique du Nord. Le Capitole, une métropole ultra-moderne, exerce un contrôle politique sur le reste du pays. Hunger Games est un événement annuel au cours duquel un garçon et une fille âgés de 12 à 18 ans, originaires de chacun des douze districts entourant le Capitole, sont tirés au sort pour s''affronter dans une bataille royale télévisée.'),
('9782253115847', 'Ne tirez pas sur l''oiseau moqueur', 'Harper Lee', '23-8-2006', 320, 'Scout, une fille intelligente et courageuse, vit à Maycomb avec son père Atticus, son frère Jem et leur cuisinière Calpurnia. Sa foi en la bonté de la société est mise à l''épreuve lors du procès de Tom Robinson, et elle finit par développer une vision qui apprécie la bonté des gens sans ignorer leur méchanceté.'),
('9782352941989', 'La terre sauvage', 'Julia Verlanger', '26-06-2008', 496, 'Dans une France en proie au chaos d''une guerre bactériologique, Gérald tente de survivre en gagnant le sud quand il tombe sur Annie, une fille qui a pour idée fixe d''aller à Paris. Pour y arriver, il leur faudra remonter l''Autoroute sauvage. Entre les mares de bactéries, les poches de gaz hallucinogènes et les bandes de pillards, le voyage promet d''être chaud ! Et puis il y a la Mort en billes, ces globes gélatineux qui se collent aux squelettes pour les animer'),
('9782290208878', 'Le Trône de fer', 'George R.R. Martin ', '10-04-2019', 802, 'Le royaume des Sept Couronnes est sur le point de connaître son plus terrible hiver : par-delà le Mur qui garde sa frontière nord, une armée de ténèbres se lève, menaçant de tout détruire sur son passage. Mais il en faut plus pour refroidir les ardeurs des rois, des reines, des chevaliers et des renégats qui se disputent le trône de fer. Tous les coups sont permis, et seuls les plus forts, ou les plus retors, s en sortiront indemnes...'),
('9782013212113', 'Twilight', 'Stephenie Meyer', '12-01-2011', 576, 'Bella, dix-sept ans, décide de quitter l''Arizona ensoleillé où elle vivait avec sa mère, pour s''installer chez son père. Elle croit renoncer à tout ce qu''elle aime, certaine qu''elle ne s''habituera jamais ni à la pluie ni à Forks où l''anonymat est interdit. Mais elle rencontre Edward, lycéen de son âge, d''une beauté inquiétante. Quels mystères et quels dangers cache cet être insaisissable, aux humeurs si changeantes ? A la fois attirant et hors d''atteinte, Edward Cullen n''est pas humain. Il est plus que ça, Bella en est certaine.'),
('9782267054859', 'Le Seigneur des Anneaux', 'J. R. R. Tolkien', '05-06-2025', 544, 'Dans un paisible village du Comté, le jeune Frodo est sur le point de recevoir un cadeau qui changera sa vie à jamais : l''Anneau de Pouvoir. Forgé par Sauron au coeur de la Montagne du Feu, on le croyait perdu depuis qu''un homme le lui avait arraché avant de le chasser hors du monde. À présent, de noirs présages s''étendent à nouveau sur la Terre du Milieu, les créatures maléfiques se multiplient et, dans les Montagnes de Brume, les Orques traquent les Nains. L''ennemi veut récupérer son bien afin de dominer le monde ; l''OEil de Sauron est désormais pointé sur le Comté. Heureusement Gandalf les a devancés. S''ils font vite, Frodo et lui parviendront peut-être à détruire l''Anneau à temps.');

-- Insertion utilisateurs
INSERT INTO utilisateur (pseudonyme, email, mot_de_passe) VALUES
('Nouhayla', 'nouhayla@example.com', '$2a$12$vMb615Hges37cdI1QGPJs.sKvGhOohpRC08VDd6rx9q9RqxsTMZfW'),
('Nicolas', 'nicolas@example.com', '$2a$12$6ZwStn0OEypT6exsAVoDkeSIDHNx.ZFghOXixnu3vkrM5YrEPD.xK'),
('admin', 'admin@example.com', '$2b$10$EzkYZKhVm2d7z6wsGyFkV.XA7e4NT.kwKaK0/ycKD/7lWj7VwWUkO'),
('Grégoire', 'gregoire@example.com', '$2a$12$pQUlTqcsLYAxIJJazj808eXZYtKniO3ktDxkPbnjmoqTjXKPvX1xi'),
('Marizia', 'marizia@example.com', '$2a$12$xLa/slWH9U3JNlmAz9F7ZOK62uNEUTk8NGKLiEyycKfY07f8SaUfm'),
('Geneviève', 'genevieve@example.com', '$2a$12$GFZfdytYZim8CcJ0GdxdQeBybUX8/rUBfwvaalTfne57aNEWZlVBy'),
('RatBiblio', 'ratbiblio@example.com', '$2a$12$EeNlwMfaxLCDi0qyWhIK/.1MfpzXGFczVcyK0jTk2Ds7YbmNJOqR.'),
('BookAddict', 'bookaddict@example.com', '$2a$12$B0Czy6EM8o9yEgO.K1DF2.3onZO/4.kuoU.mbNUUTi552IYez9O.q'),
('JMlire', 'jmlire@example.com', '$2a$12$BQ7XhEleUADXxnc.VEtBzuL3zZuB266/LH1jMkEwIEBSFNj6Lw0Eq'),
('ToutLire', 'toutlire@example.com', '$2a$12$5yVnF90.aAqV91aIbCXw4exBf0YMJD/IZsB/QLtlPprwkvWp/1yEy') ;


-- Insertion interaction
INSERT INTO utilisateur_interagit_livre (id_utilisateur, id_livre, est_lu, est_partage, note, commentaire) VALUES 
(3, 14, TRUE, FALSE, 5, 'Super livre !'),
(3, 13, TRUE, TRUE, 3, 'Super livre !'),
(3, 12, TRUE, FALSE, 4, 'Super livre !'),
(3, 6, TRUE, TRUE, 5, 'Super livre !'),
(7, 4, TRUE, TRUE, 5, 'J''ai adoré l''ambiance de ce roman, ce monde dytopique ou le héros met fin à cette société deshumanisée. '),
(8, 4, TRUE, FALSE, 5, 'Thème d''une société où l''on decide absolument de tout pour vous : choix entre 4 prenoms, boulot attribué d''office , relations sexuelles controlées. Ici, le monde est gouverné par un super-ordinateur, et les êtres humains subissent une uniformisation grâce à un traitement hormonal qui supprime toute violence, mais aussi toute volonté. Le fun quoi !!!  '),
(9, 4, TRUE, FALSE, 4, 'Ce roman, bien qu''ayant vieilli, décrit une société où les ordinateurs ont pris le pouvoir sur l''humanité, on s''y croirait."'),
(10, 4, TRUE, TRUE, 5, 'On a pas du tout envie de quitter Copeau, et le suspense est maintenu jusqu''au bout.  '),
(4, 2, TRUE, TRUE, 5, 'J''ai commencé ce livre un jour sur un coup de tête, c''était mon premier roman de fantasy pure et dure et je l''ai lu d''une traite. Il est tout simplement génial, l''univers créé par l''auteur est complet, magique, intriguant et dangereux parfois. J''ai adoré m''y perdre et voyager en compagnie d''Eragon et Saphira'),
(3, 2, TRUE, TRUE, 4, 'Je suis vraiment surprise de la qualité de ce livre ! C''est de la Fantasy jeunesse et pourtant j''ai adoré ! J''ai vécu ces aventures comme si j''y étais'),
(3, 5, FALSE, FALSE, 2, 'NULL'),
(8, 5, TRUE, FALSE, 2, 'Histoire longue à démarrer, Dans la deuxième moitié du roman, les choses s’accélèrent, la véritable nature des personnages commence à se révéler'),
(2, 1, TRUE, FALSE, 4, 'Je le conseille à tout lecteur ! Quelque soit son âge, son niveau de lecture, Harry Potter est une perle ! Il se démarque par sa simplicité, son scénario révolutionnaire certes mais qui s''inscrit dans un monde que Rowling parvient à recréer parfaitement ! En tout cas à ne pas manquer. '),
(4, 1, TRUE, TRUE, 5, 'Jamais je n''oublierai cette série qui m''a fait aimer lire. Je l''ai relue au moins trois fois. Rowling mérite son succès, c''est grâce à elle que le fantastique-jeunesse a connu son essor.'),
(5, 3, TRUE, TRUE, 4, 'J''ai adoré cette histoire, surtout la première partie mais l''ensemble reste quand même génial. Dumas écrit vraiment bien et l''intrigue est bien menée.'),
(6, 3, TRUE, FALSE, 3, 'Une magnifique histoire de vengeance, probablement le livre de Alexandre Dumas le plus facile à lire.'),
(7, 11, TRUE, FALSE, 4, 'Longtemps que je n''avais pas lu des nouvelles d''une telle fraicheur. N''ayant jamais lu auparavant des écrits de Julia Verlanger, je suis enthousiaste, c''est pourquoi je viens de me jeter dans le second volume de son intégrale.'),
(7, 11, TRUE, FALSE, 4, 'Moi qui en son temps est adorée les "Mad Max" avec Mel Gibson, j''ai aimé ces histoires post apocalyptique. Comment survivre et retrouver de l''espoir dans un monde de chaos, de violence.'),
(9, 6, TRUE, TRUE, 3, 'Un des incontournables de la SF, où tous les thèmes majeurs sont abordés. A noter que l''aspect géopolitique n''a absolument pas vieilli.'),
(6, 6, TRUE, FALSE, 5, 'Quelle imagination jusque dans les détails techniques (combinaisons Fremens, distilles...), une superbe saga qu''on a du mal à lâcher !!!! Tout simplement génial...'),
(1, 7, TRUE, FALSE, 4, 'Une merveilleuse histoire. On s''y accroche à ce petit bout d''enfant. L''innocence de l''enfant et la nostalgie qu''on en a nous reviennent en pleine face quand on parcourt les pages de ce livre'),
(5, 7, TRUE, FALSE, 4, 'C''est un livre à lire et à relire. Etrangement, selon les jours, ce n''est jamais la même impression qui en ressort ni les mêmes ressentiments. Comme si chaque lecture apportait toujours quelque chose de nouveau !'),
(7, 8, TRUE, FALSE, 3, 'magnifique livre ! Un dessinteur de génie qui nous recréé paris et un auteur à l''humour quelques peu....compliquer. A lire'),
(9, 8, FALSE, FALSE, 4, 'NULL'),
(10, 9, TRUE, TRUE, 5, 'Ce livre m''a coupé le souffle. Ca faisait un moment que j''attendais qu''un livre me frappe comme cela. Hé bien là, j''ai été servi.'),
(2, 9, TRUE, FALSE, 5, 'Accrochez-vous. Une vision de la télé réalité futuriste. Un livre qui vous prends aux tripes, vous luttez en même temps que l''héroine pour survivre.'),
(1, 10, TRUE, TRUE, 4, 'A travers les yeux d''une petite fille, on montre la ségrégation aux Etats-Unis. Le style est léger et drôle, mais derrière se cache une histoire pesante. Je le conseille à tout le monde.'),
(8, 10, TRUE, FALSE, 2, 'Au risque de me faire tirer dessus, je dois malheureusement avouer que je n’ai pas accroché du tout à cette lecture… J’en ressors fort déçue. '),
(2, 12, TRUE, TRUE, 4, 'Honnêtement, je m’attendais à m’ennuyer ferme en lisant ce livre, parce que j''avais déjà vu la première saison de la série et je connaissaient déjà le dénouement de l''histoire. Et bien c''est tout le contraire. Il n''y a pas une seule chose que je n''ai pas aimé dans ce roma'),
(9, 12, TRUE, TRUE, 3, 'Une Fantasy riche qui m''a beaucoup plu où l''on découvre à chaque chapitre le point de vue d''un protagoniste.'),
(8, 13, TRUE, FALSE, 1, 'Cette saga est une énigme pour moi!!! Je ne supporte pas les personnages principaux (Bella, Edward et Jacob), je trouve l''histoire d''une niaiserie sans précédent.... '),
(9, 13, FALSE, FALSE, 5, 'NULL'),
(10, 10, TRUE, TRUE, 4, 'un classique de chez classique dans le genre héroïc fantasy / SF....c''est plus qu''une histoire que nous peint Tolkien, c''est une fresque avec tout ce que cela attend '),
(1, 2, TRUE, FALSE, 2, 'Lu et relu un certain nombre de fois. J''aime entrer dans ce monde de créatures, magique, monstrueuses, où le mal et le bien mène un combat permanent. ');

COMMIT;

