import selectorEngine from '../dom/selectorEngine';
import { AsBaseComponent } from './base-component';
import { formSelect } from './formSelect';

const SELECTS_CLASS_NAME_SELECTOR = '.select-container';
const FORM_SELECTOR = '.form_wrapper';
const FILE_INPUT_SELECTOR = '#image__input';
const CHECKBOX_SELECTOR = '#checkbox-lable';
const RADIOBOX_SELECTOR = '#radiobox-lable';

const NAEM = 'form';

class Form extends AsBaseComponent {
  constructor(element) {
    super(element);

    this._init();
  }

  _init() {
    this._initSelects();

    this._fileInputHandler();

    this._checkBoxSelect();
    this._raddioBoxSelect();
    this._clearImageInput();
    this._clearInpuImages();
  }

  _initSelects() {
    const selectsEls = selectorEngine.find(
      SELECTS_CLASS_NAME_SELECTOR,
      this._element
    );
    if (selectsEls === null || selectsEls.length === 0) {
      return;
    }
    selectsEls.map((selectEl) => {
      new formSelect(selectEl);
    });
  }
  _fileInputHandler() {
    const imageInputEl = selectorEngine.findOne(
      FILE_INPUT_SELECTOR,
      this._element
    );

    if (!imageInputEl || imageInputEl === null) {
      return;
    }

    const imageContainer = selectorEngine.findOne('.image_container');

    const imageContainerTemplate = selectorEngine.findOne(
      '#image-container-temlate'
    );

    imageInputEl.addEventListener('change', () => {
      imageInputEl.files.forEach((file) => {
        let reader = new FileReader();

        if (imageInputEl.hasAttribute('multiple')) {
          const imageContainerEl = document.importNode(
            imageContainerTemplate.content,
            true
          );

          let img = imageContainerEl.querySelector('img');
          reader.onload = () => {
            img.src = reader.result;
          };

          imageContainer.appendChild(imageContainerEl);
          reader.readAsDataURL(file);
        } else {
          const img = selectorEngine.findOne('img', imageContainer);
          reader.onload = () => {
            img.src = reader.result;
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }
  _clearImageInput() {
    const clearButton = selectorEngine.findOne(
      '#clear_image_input',
      this._element
    );
    if (!clearButton) {
      return;
    }
    clearButton.addEventListener('click', () => {
      const imageContainer = selectorEngine.findOne('.image_container');

      selectorEngine.findOne('img', imageContainer).src =
        './assets/images/Person/blank.png';
      const imageInputEl = selectorEngine.findOne(
        FILE_INPUT_SELECTOR,
        this._element
      );
      console.log(imageInputEl.files);
      imageInputEl.value = '';
      console.log(imageInputEl.files);
    });
  }
  _clearInpuImages() {
    const clearButton = selectorEngine.findOne(
      '#clear_images_input',
      this._element
    );
    if (!clearButton) {
      return;
    }
    clearButton.addEventListener('click', () => {
      const imageContainer = selectorEngine.findOne('.image_container');

      const images = selectorEngine.find('.image_holder', imageContainer);
      images.forEach((el) => {
        el.remove();
      });

      const imageInputEl = selectorEngine.findOne(
        FILE_INPUT_SELECTOR,
        this._element
      );
      imageInputEl.value = '';
    });
  }

  _checkBoxSelect() {
    const checkboxs = selectorEngine.find(CHECKBOX_SELECTOR, this._element);

    if (checkboxs.length === 0) {
      return;
    }

    checkboxs.forEach((checkEl) => {
      checkEl.addEventListener('click', (e) => {
        e.preventDefault();

        const input = selectorEngine.findOne('input', checkEl);

        if (input.checked === false) {
          input.checked = true;
        } else {
          input.checked = false;
        }
        checkEl.classList.toggle('active');
      });
    });
  }

  _raddioBoxSelect() {
    const redioBoxsEl = selectorEngine.find(RADIOBOX_SELECTOR, this._element);
    if (redioBoxsEl.length === 0) {
      return;
    }
    redioBoxsEl.forEach((radioEl) => {
      radioEl.addEventListener('click', (e) => {
        this._raddioBoxSelectHandler(redioBoxsEl, radioEl);
      });
    });
  }
  _raddioBoxSelectHandler(radioEls, radioEl) {
    radioEls.forEach((el) => {
      el.classList.remove('active');
    });
    radioEl.classList.toggle('active');
  }

  static get NAME() {
    return NAEM;
  }
}

export default {
  initForms() {
    const formsEl = selectorEngine.find(FORM_SELECTOR);
    if (!formsEl || formsEl.length === 0) {
      return;
    }
    formsEl.map((formEl) => {
      new Form(formEl);
    });
  },
};
