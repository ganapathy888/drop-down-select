function classNames(...args) {
  let styles = [];
  args.map((item) => {
    if (typeof(item) == 'string') {
      styles.push(item);
    } else if (typeof(item) == 'object') {
      for (var key in item) {
        if (item.hasOwnProperty(key)) {
          if (item[key]) {
            styles.push(key);
          }
        }
      }
    }
  });
  return styles.join(' ');
}

// Export
export default classNames;
