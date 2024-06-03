import { MongoError } from 'mongodb';

type ErrorDetail = {
  operatorName: string;
  specifiedAs?: Record<string, any>;
  reason: string;
  consideredValue?: any;
};

type PropertyNotSatisfied = {
  propertyName: string;
  description: string;
  details: ErrorDetail[];
};

type SchemaRuleNotSatisfied = {
  operatorName: string;
  propertiesNotSatisfied: PropertyNotSatisfied[];
};

type ErrInfo = {
  failingDocumentId: string;
  details: {
    operatorName: string;
    schemaRulesNotSatisfied: SchemaRuleNotSatisfied[];
  };
};

type ErrorResponse = {
  index: number;
  code: number;
  errmsg: string;
  errInfo?: ErrInfo;
};

type CustomMongoError = {
  errorResponse?: ErrorResponse;
} & MongoError;

export { CustomMongoError };
