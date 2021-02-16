export const ExperienceSliderConfig = {
  min: -1,
  max: 10,
  displayWith: (value: number) => {
    switch (value) {
      case -1: return '<1';
      default: return `≥${value.toString()}`;
    }
  }
};
