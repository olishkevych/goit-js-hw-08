import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');

const STORAGE_KEY = 'feedback-form-state';

let feedbackFormData = {
  email: '',
  message: '',
};

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

fillFormFields();

function onFormInput(event) {
  if (event.target === emailEl) {
    feedbackFormData.email = event.target.value;
  } else if (event.target === messageEl) {
    feedbackFormData.message = event.target.value;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
}

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  console.log(feedbackFormData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function fillFormFields() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);
  if (savedFormData) {
    const parsedFormData = JSON.parse(savedFormData);
    emailEl.value = parsedFormData.email;
    messageEl.value = parsedFormData.message;
  }
}
