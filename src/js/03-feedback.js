import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');

const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

fillFormFields();

function onFormInput(event) {
  let feedbackFormData = localStorage.getItem(STORAGE_KEY);
  if (feedbackFormData) {
    feedbackFormData = JSON.parse(feedbackFormData);
  } else {
    feedbackFormData = {};
  }
  feedbackFormData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
}

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  if (email.value === '' || message.value === '') {
    window.alert('Fill in all the fields');
    return;
  }
  const data = {
    email: email.value,
    message: message.value,
  };
  console.log(data);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function fillFormFields() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);

  if (savedFormData) {
    const parsedFormData = JSON.parse(savedFormData);
    emailEl.value = parsedFormData.email ? parsedFormData.email : '';
    messageEl.value = parsedFormData.message ? parsedFormData.message : '';
  }
}
