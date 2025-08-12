const response = (req, res, next) => {
  res.success = (status, data) => {
    if (status === 204) {
      return res.status(status).send();
    }

    return res.status(status ?? 200).json({
      success: true,
      data,
    });
  };

  res.error = (status, message, details, err) => {
    if (err && process.env.NODE_ENV === "development") {
      console.error(err);
    }

    const response = {
      success: false,
      message: message ?? err?.toString(),
      details: details ?? null,
    };

    return res.status(status ?? 500).json(response);
  };

  next();
};

module.exports = response;
