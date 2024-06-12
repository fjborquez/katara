function convert(profile: any) {
  return Object.entries(profile).filter((restriction) => {
    return restriction[1] === true;
  }).map((restriction) => {
    return Number(restriction[0].replace(/\D/g, ''));
  });
}

export {convert as nutritionalProfileToArray}
