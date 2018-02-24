function classNames(...args) {
  const styles = [];
  args.forEach((item) => {
    if (typeof item === 'string') {
      styles.push(item);
    } else if (typeof item === 'object') {
      item.keys.forEach((key) => {
        if (item[key]) {
          styles.push(key);
        }
      });
    }
  });
  return styles.join(' ');
}

// Export
export default classNames;
