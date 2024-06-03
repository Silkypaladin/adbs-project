import { Injectable } from '@nestjs/common';
import { CustomMongoError } from '../types/mongo-error';

@Injectable()
export class ErrorParser {
  parseError(error: CustomMongoError) {
    if (this.isValidationError(error)) {
      this.parseValidationError(error);
      return;
    }
    this.parseMongoError(error);
  }

  private parseMongoError(error: CustomMongoError) {
    console.log(`[ErrorParser] ${error.errorResponse.errmsg}`);
  }

  private parseValidationError(error: CustomMongoError) {
    const details = error.errorResponse.errInfo.details;
    if (!details.schemaRulesNotSatisfied) {
      console.log('[ErrorParser] Unknown validation error');
      return;
    }

    const parsed = details.schemaRulesNotSatisfied
      .map((rule) =>
        rule.propertiesNotSatisfied
          .map((property) => {
            const reasons = property.details.map((detail) => {
              const value = `Considered value: "${detail.consideredValue}"`;
              return `Error in "${property.propertyName}" | ${detail.reason} | Failed rule: ${detail.operatorName} | ${value}`;
            });
            return reasons.join(', ');
          })
          .join(', '),
      )
      .join(', ');
    console.log(`[ErrorParser] ${parsed}`);
  }

  private isValidationError(error: CustomMongoError): boolean {
    return error?.errorResponse.errInfo !== undefined;
  }
}
