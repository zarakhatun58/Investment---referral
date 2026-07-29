const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Investment Platform API",
    version: "1.0.0",
    description: "MERN Investment & Referral Platform"
  },

  servers: [
  {
    url:
      process.env.NODE_ENV === "production"
        ? "https://investment-referral.onrender.com"
        : "http://localhost:5000",
    description: "API Server",
  },
],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    schemas: {
      RegisterRequest: {
        type: "object",
        required: [
          "fullName",
          "email",
          "mobile",
          "password",
        ],
        properties: {
          fullName: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "john@gmail.com",
          },
          mobile: {
            type: "string",
            example: "9876543210",
          },
          password: {
            type: "string",
            example: "123456",
          },
          referralCode: {
            type: "string",
            example: "ABC123",
          },
        },
      },

      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            example: "john@gmail.com",
          },
          password: {
            type: "string",
            example: "123456",
          },
        },
      },

      InvestmentRequest: {
        type: "object",
        required: [
          "amount",
          "planName",
          "dailyROI",
          "durationDays",
        ],
        properties: {
          amount: {
            type: "number",
            example: 1000,
          },
          planName: {
            type: "string",
            example: "Starter Plan",
          },
          dailyROI: {
            type: "number",
            example: 2,
          },
          durationDays: {
            type: "number",
            example: 30,
          },
        },
      },
    },
  },

paths: {
  "/api/auth/register": {
    post: {
      tags: ["Authentication"],
      summary: "Register User",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterRequest",
            },
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
        },
      },
    },
  },

  "/api/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "Login User",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
        },
      },
    },
  },

  "/api/auth/profile": {
    get: {
      tags: ["Authentication"],
      summary: "Get Logged In User",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "User Profile",
        },
      },
    },
  },

  "/api/dashboard": {
    get: {
      tags: ["Dashboard"],
      summary: "Dashboard Data",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Dashboard",
        },
      },
    },
  },

  "/api/investments": {
    get: {
      tags: ["Investments"],
      summary: "Get Investments",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Investment List",
        },
      },
    },

    post: {
      tags: ["Investments"],
      summary: "Create Investment",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/InvestmentRequest",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Investment Created",
        },
      },
    },
  },

  "/api/plans": {
    get: {
      tags: ["Plans"],
      summary: "Get Investment Plans",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Plan List",
        },
      },
    },

    post: {
      tags: ["Plans"],
      summary: "Create Plan",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        201: {
          description: "Plan Created",
        },
      },
    },
  },

  "/api/plans/{id}": {
    get: {
      tags: ["Plans"],
      summary: "Get Plan By Id",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Plan Details",
        },
      },
    },

    put: {
      tags: ["Plans"],
      summary: "Update Plan",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Plan Updated",
        },
      },
    },

    delete: {
      tags: ["Plans"],
      summary: "Delete Plan",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Plan Deleted",
        },
      },
    },
  },

  "/api/referrals/direct": {
    get: {
      tags: ["Referrals"],
      summary: "Direct Referrals",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Referral List",
        },
      },
    },
  },

  "/api/referrals/tree": {
    get: {
      tags: ["Referrals"],
      summary: "Referral Tree",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Referral Tree",
        },
      },
    },
  },

  "/api/referrals/referral-income": {
    get: {
      tags: ["Referrals"],
      summary: "Referral Income History",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Referral Income",
        },
      },
    },
  },

  "/api/roi-history": {
    get: {
      tags: ["ROI"],
      summary: "ROI History",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "ROI History",
        },
      },
    },
  },

  "/api/transactions": {
    get: {
      tags: ["Transactions"],
      summary: "Wallet Transactions",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Transaction List",
        },
      },
    },
  },
},
};

export default swaggerDocument;