const pathImages: string = "./assets/images/";
let arrImgs: string[] = [];

const buttons: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
  ".sliderContainer > span"
);
const qtnd = document.querySelector(".counter") as HTMLTitleElement;
document.body.onload = () => {
  qtnd.innerText = "0/0";
  const inputFile = document.querySelector(
    "input[type='file'"
  ) as HTMLInputElement;
  inputFile.addEventListener("change", (e) => {
    const { target }: any = e;
    const files: File[] = Array.from(target.files as FileList);
    const path: string[] = [];

    files.forEach((file: any) => {
      path.push(URL.createObjectURL(file));
      URL.revokeObjectURL(file);
    });
    arrImgs = path;
    Init();
  });
  Init();
};

function Init(): void {
  const sliderContainer = document.getElementsByClassName(
    "sliderContainer"
  )[0] as HTMLDivElement;

/*   sliderContainer.ondblclick = () => {
    sliderContainer.requestFullscreen().catch((err) => {
      console.log(err);
    });
  }; */

  let counter: number = 0;
  const sliderImages = document.getElementsByClassName(
    "sliderImgs"
  )[0] as HTMLDivElement;

  if (arrImgs.length > 0) {
    counter = 0;
    Array.from(sliderImages.children).forEach((img) => img.remove());
  }
  window.addEventListener("resize", () => {
    document.querySelectorAll("img").forEach((img) => {
      img.style.width = `${sliderContainer.clientWidth}px`;
    });
  });
  arrImgs.forEach((path) => {
    const tagImg: HTMLImageElement = document.createElement("img");
    tagImg.src = path;
    tagImg.alt = "imagem";
    tagImg.style.width = `${sliderContainer.clientWidth}px`;
    sliderImages.appendChild(tagImg);
  });

  const img = sliderImages.children[0] as HTMLImageElement;
  const imageWidth = parseInt(img.style.width) | 0;
  sliderImages.style.width = `${imageWidth * arrImgs.length}px`;

  const move = () => {
    sliderImages.style.transform = `translateX(-${imageWidth * counter}px)`;
    arrImgs.length > 0 && (qtnd.innerText = `${counter + 1}/${arrImgs.length}`);
  };
  const toLeft = () => {
      counter === 0 ? (counter = arrImgs.length - 1) : counter--;
      move();
    },
    toRight = () => {
      counter >= arrImgs.length - 1 ? (counter = 0) : counter++;
      move();
    };
  arrImgs.length > 0 && (qtnd.innerText = `${counter + 1}/${arrImgs.length}`);
  buttons.forEach((button: HTMLSpanElement) => {
    button.onclick = (e) => {
      button.classList[0] === "left" ? toLeft() : toRight();
    };
  });
}
