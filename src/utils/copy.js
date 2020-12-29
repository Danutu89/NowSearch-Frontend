export default async function(text) {
    try {
      const toCopy = text || location.href;
      await navigator.clipboard.writeText(toCopy);
      console.log('Text or Page URL copied');
    }
    catch (err) {
      console.error('Failed to copy: ', err);
    }
  }