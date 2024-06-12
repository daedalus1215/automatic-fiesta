import { Injectable } from "@nestjs/common";

@Injectable()
export class GroupTitlesFormatConverter {
    apply(results) {
        const newResults = [];
        const keys = Object.keys(results);

        for (let key of keys) {
            newResults.push({
                date: key,
                ...results[key]
            })
        }

        return newResults
            .sort(this.sort);
    }

    sort(firstDate: any, secondDate: any) {
        return (new Date(firstDate.date) as any) - (new Date(secondDate.date) as any)
    }
}