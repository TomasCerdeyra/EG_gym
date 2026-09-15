import eg02 from "../assets/eg-02.jpg";
import eg05 from "../assets/eg-05.jpg";
import eg06 from "../assets/eg-06.jpg";
import eg08 from "../assets/eg-08.jpg";
import eg09 from "../assets/eg-09.jpg";
import eg10 from "../assets/eg-10.jpg";
import eg11 from "../assets/eg-11.jpg";
import eg12 from "../assets/eg-12.jpg";

import eg02w800 from "../assets/eg-02-800.jpg";
import eg02w1400 from "../assets/eg-02-1400.jpg";
import eg05w800 from "../assets/eg-05-800.jpg";
import eg05w1400 from "../assets/eg-05-1400.jpg";
import eg06w800 from "../assets/eg-06-800.jpg";
import eg08w800 from "../assets/eg-08-800.jpg";
import eg09w800 from "../assets/eg-09-800.jpg";
import eg10w800 from "../assets/eg-10-800.jpg";
import eg11w800 from "../assets/eg-11-800.jpg";
import eg12w800 from "../assets/eg-12-800.jpg";

export interface GalleryImage {
  src: string;
  alt: string;
  /** Candidate list for srcset, so a phone never downloads the large file. */
  srcSet?: string;
}

/**
 * Hero: the sharpest photograph in the set and the only square one (2400x2400),
 * so it survives a landscape crop. A bright hero shows softness plainly, which
 * is why the highest-resolution frame belongs here rather than in the spotlight.
 */
export const HERO_IMAGE: GalleryImage = {
  src: eg02,
  srcSet: `${eg02w800} 800w, ${eg02w1400} 1400w, ${eg02} 2400w`,
  alt: "Socio entrenando en poleas en EG Gimnasio",
};

/**
 * Spotlight: one photograph, shown twice. The covering layer is darkened and
 * desaturated, the layer underneath is left untouched, so the cursor opens a
 * window of colour into the same scene instead of cutting between two.
 */
export const SPOTLIGHT_IMAGE: GalleryImage = {
  srcSet: `${eg05w800} 800w, ${eg05w1400} 1400w, ${eg05} 2332w`,
  // Only a small lit circle is ever shown in colour here and the rest is
  // darkened and desaturated, so a softer frame carries this section fine.
  src: eg05,
  alt: "Sala de EG Gimnasio con bicicletas y máquinas",
};

/**
 * Contact backdrop, behind the closing call to action. This band is wide and
 * short, and a portrait frame survives that badly: at roughly 1568x640 a 9:16
 * photograph shows 23% of its height, while this square one shows 41%. It is
 * also the sharpest in the set, and here it sits under a gradient far enough
 * from the hero to read as a closing note rather than a repeat.
 */
export const CONTACT_IMAGE: GalleryImage = {
  src: eg02,
  srcSet: `${eg02w800} 800w, ${eg02w1400} 1400w, ${eg02} 2400w`,
  alt: "Socio entrenando en poleas en EG Gimnasio",
};

/**
 * Real photographs only. eg-01, eg-03, eg-04 and eg-07 are Instagram graphics
 * with headline text burned into them ("LA EXPO", "GYM REVIEW", "HOY CUMPLIMOS
 * 1 ANO", the logo lockup). They read as flyers next to real photos, so they
 * stay out of the gallery.
 */
export const GALLERY: GalleryImage[] = [
  { src: eg06, srcSet: `${eg06w800} 800w, ${eg06} 1200w`, alt: "Dos socias chocando las manos sobre una barra" },
  { src: eg12, srcSet: `${eg12w800} 800w, ${eg12} 1200w`, alt: "Socio haciendo press de banca en EG Gimnasio" },
  { src: eg08, srcSet: `${eg08w800} 800w, ${eg08} 1200w`, alt: "Socio entrenando piernas en EG Gimnasio" },
  { src: eg11, srcSet: `${eg11w800} 800w, ${eg11} 1200w`, alt: "Esteban con un socio en EG Gimnasio" },
  { src: eg09, srcSet: `${eg09w800} 800w, ${eg09} 1200w`, alt: "Disco de peso con el logo de EG Gimnasio" },
  { src: eg10, srcSet: `${eg10w800} 800w, ${eg10} 1200w`, alt: "Festejo de aniversario en EG Gimnasio" },
];
