import slugify from "slugify";
import logger from "../helpers/logger";

export const convertName = (name: string) => {
    const nameResult = slugify(name, {
        replacement: '-',
        remove: undefined,
        lower: true, 
        strict: false, 
        locale: 'vi',      
        trim: true        
    });
    return nameResult
};

export const generatePassword = async(name:string, birth?:string) => {
    const specialChars = ['!', '@', '#', '$', '%', '&', '*'];
    const variations = [];
    for(let char of specialChars) {
        const nameResult = convertName(name).split('-');
        const day = birth?.split('/')[0];
        const month = birth?.split('/')[1];
        const year = birth?.split('/')[2];
        const surname = nameResult[0];
        const fullname = nameResult.join('');
        const name1 = nameResult.pop();
        // name + char
        variations.push(`${name1}${char}`);

        // surname + char
        variations.push(`${surname}${char}`);

        // fullname + 123 + char
        variations.push(`${fullname}123${char}`);
        // fullname + char
        variations.push(`${fullname}${char}`);
        if (birth) {
            // name + month + day + char
            variations.push(`${name1}${month + day}${char}`);
            // name + year + char
            variations.push(`${name1}${year}${char}`);

            // surname + day + char
            variations.push(`${surname}${day}${char}`);
            // surname + month + day + char
            variations.push(`${surname}${month + day}${char}`);
            surname + year + char
            variations.push(`${surname}${year}${char}`);
            
            // fullname + year + month + day + char
            variations.push(`${fullname}${year + month + day}${char}`);
            // fullname + year + char
            variations.push(`${fullname}${year}${char}`);
            // fullname + month + day + char
            variations.push(`${fullname}${month + day}${char}`);
      
            // month + day + year + char
            variations.push(`${month + day + year}${char}`);
            // year + month + day + char
            variations.push(`${year + month + day}${char}`);
            // year + day + month + char
            variations.push(`${ year + day + month}${char}`);
        }
    }
    return variations.length;
};
